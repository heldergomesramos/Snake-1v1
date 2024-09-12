using api.Controllers;
using api.Dtos.Lobby;
using api.Mappers;

namespace api.Models
{
    public class Game
    {
        private static readonly int tileVariations = 16;
        public string GameId { get; private set; } = string.Empty;
        public Lobby Lobby { get; private set; }

        public int[][] GroundLayer { get; private set; }
        public IEntity[][] EntityLayer { get; private set; }

        public int Player1Score { get; private set; } = 0;
        public int Player2Score { get; private set; } = 0;
        public int GameTick { get; private set; } = 0;

        // Maps <playerId, Snake>
        public Dictionary<string, Snake> Snakes { get; set; } = [];
        // Listens and changes direction based on player input (example: "Press A -> "l", dictionary maps<playerId,direction>)
        public Dictionary<string, string> DirectionCommand { get; set; } = [];

        public enum GameState
        {
            Waiting,
            InProgress,
            Finished
        }
        public GameState State { get; set; } = GameState.Waiting;

        public abstract class IEntity(int x, int y)
        {
            public int X { get; set; } = x;
            public int Y { get; set; } = y;
            public abstract string ToData();
        }

        public class SnakeSegment(int x, int y, string direction, string type, int playerNumber) : IEntity(x, y)
        {
            public int PlayerNumber { get; set; } = playerNumber;
            public string Direction { get; set; } = direction;
            public string Type { get; set; } = type;

            public override string ToData()
            {
                return $"snake{PlayerNumber}-{Type}-{Direction}";
            }
        }

        public class Apple(int x, int y) : IEntity(x, y)
        {
            public override string ToData()
            {
                return "apple";
            }
        }

        public class Snake
        {
            public List<SnakeSegment> Segments { get; set; } = [];
            public SnakeSegment Head { get; set; }
            public SnakeSegment Tail { get; set; }

            public Snake(int playerNumber, int gameHeight, int gameWidth)
            {
                int y; // Vertical position (row)
                int tailX, bodyX, headX; // Horizontal positions (columns)
                // Determine the vertical position based on the board height (center-ish)
                if (gameHeight % 2 == 0)
                {
                    // If the board height is even, snake 1 is at index 4, snake 2 at index 5
                    y = playerNumber == 1 ? (gameHeight / 2) - 1 : (gameHeight / 2);
                }
                else
                {
                    // If the board height is odd, snake 1 is at index 4, snake 2 at index 6
                    y = playerNumber == 1 ? (gameHeight / 2) - 1 : (gameHeight / 2) + 1;
                }

                if (playerNumber == 1)
                {
                    // Snake 1 faces right
                    tailX = 1; // Tail near the left edge
                    bodyX = 2;
                    headX = 3; // Head points towards the right
                }
                else
                {
                    // Snake 2 faces left
                    tailX = gameWidth - 2; // Tail near the right edge
                    bodyX = gameWidth - 3;
                    headX = gameWidth - 4; // Head points towards the left
                }

                // Create the segments for the snake
                Tail = new SnakeSegment(tailX, y, playerNumber == 1 ? "r" : "l", "tail", playerNumber);
                var body = new SnakeSegment(bodyX, y, playerNumber == 1 ? "r" : "l", "body", playerNumber);
                Head = new SnakeSegment(headX, y, playerNumber == 1 ? "r" : "l", "head", playerNumber);

                Segments.Add(Head);
                Segments.Add(body);
                Segments.Add(Tail);
            }
        }


        public Game(Lobby lobby)
        {
            if (lobby == null || lobby.GameSettings == null)
            {
                throw new ArgumentException("Lobby and its GameSettings cannot be null.");
            }
            GameId = Guid.NewGuid().ToString();
            Lobby = lobby;
            var height = Lobby.GameSettings.Height;
            var width = Lobby.GameSettings.Width;

            GroundLayer = new int[height][];
            for (int i = 0; i < height; i++)
            {
                GroundLayer[i] = new int[width];
                for (int j = 0; j < width; j++)
                    GroundLayer[i][j] = new Random().Next(tileVariations);
            }

            EntityLayer = new IEntity[height][];
            for (int i = 0; i < height; i++)
                EntityLayer[i] = new IEntity[width];

            if (lobby.Player1 != null)
                Snakes[lobby.Player1.PlayerId] = new Snake(1, Lobby.GameSettings.Height, Lobby.GameSettings.Width);
            if (lobby.Player2 != null)
                Snakes[lobby.Player2.PlayerId] = new Snake(2, Lobby.GameSettings.Height, Lobby.GameSettings.Width);

            foreach (var sn in Snakes)
                AddSnakeToEntityLayer(sn.Value);

            Player1Score = 0;
            Player2Score = 0;
            GameTick = 0;
        }

        public void AddSnakeToEntityLayer(Snake snake)
        {
            foreach (IEntity segment in snake.Segments)
                EntityLayer[segment.Y][segment.X] = segment;
        }

        public void ReceiveDirectionCommand(string playerId, string command)
        {
            DirectionCommand[playerId] = command;
        }

        // Handle player direction command
        public void HandleDirectionCommand(string playerId, string direction)
        {
            DirectionCommand[playerId] = direction;
        }

        // Update game state
        public void UpdateGameState()
        {
            // Implement game update logic, e.g., move snakes, check for collisions, etc.
            GameTick++;
            // Example: Update snake positions based on direction commands
            foreach (var playerId in DirectionCommand.Keys)
            {
                if (Snakes.TryGetValue(playerId, out var snake))
                {
                    // Move the snake based on DirectionCommand[playerId]
                    // Implement movement logic here
                }
            }
            // Additional game update logic here
        }

        public GameData ToResponseDto()
        {
            return new GameData(this);
        }

        public class GameData
        {
            public string GameId { get; private set; } = string.Empty;
            public PrivateLobbyResponseDto Lobby { get; private set; }

            public int[][] GroundLayer { get; private set; }
            public string[][] EntityLayer { get; private set; }

            public int Player1Score { get; private set; } = 0;
            public int Player2Score { get; private set; } = 0;
            public int GameTick { get; private set; } = 0;

            public GameData(Game game)
            {
                GameId = game.GameId;
                Lobby = LobbyMappers.ToResponseDto((PrivateLobby)game.Lobby); // Change this when making Public option
                GroundLayer = game.GroundLayer;
                EntityLayer = EntityLayerToData(game.EntityLayer);
                Player1Score = game.Player1Score;
                Player2Score = game.Player2Score;
                GameTick = game.GameTick;
            }

            private static string[][] EntityLayerToData(IEntity[][] layer)
            {
                int height = layer.Length;
                int width = layer[0].Length;

                string[][] dataLayer = new string[height][];

                for (int i = 0; i < height; i++)
                {
                    dataLayer[i] = new string[width];
                    for (int j = 0; j < width; j++)
                    {
                        if (layer[i][j] != null)
                            dataLayer[i][j] = layer[i][j].ToData();
                        else
                            dataLayer[i][j] = "empty";
                    }
                }
                return dataLayer;
            }
        }
    }
}