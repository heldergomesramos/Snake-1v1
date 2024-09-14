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
        public int Time { get; private set; } = 3000;
        public int TickInterval { get; private set; } = 0;

        // Maps <playerId, Snake>
        public Dictionary<string, Snake> Snakes { get; set; } = [];
        // Listens and changes direction based on player input (example: "Press A -> "l", dictionary maps<playerId,direction>)
        public Dictionary<string, char> DirectionCommand { get; set; } = [];

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
            public string PlayerId { get; set; } = string.Empty;
            public List<SnakeSegment> Segments { get; set; } = [];
            public SnakeSegment Head { get; set; }
            public SnakeSegment Tail { get; set; }

            public Snake(string playerId, int playerNumber, int gameHeight, int gameWidth)
            {
                PlayerId = playerId;
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
                var body = new SnakeSegment(bodyX, y, "h", "body", playerNumber);
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
            TickInterval = 1000 / Lobby.GameSettings.Speed;

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
            {
                var playerId = lobby.Player1.PlayerId;
                Snakes[playerId] = new Snake(playerId, 1, Lobby.GameSettings.Height, Lobby.GameSettings.Width);
                DirectionCommand[playerId] = 'r';
            }
            if (lobby.Player2 != null)
            {
                var playerId = lobby.Player2.PlayerId;
                Snakes[playerId] = new Snake(playerId, 2, Lobby.GameSettings.Height, Lobby.GameSettings.Width);
                DirectionCommand[playerId] = 'l';
            }

            foreach (var sn in Snakes)
                AddSnakeToEntityLayer(sn.Value);

            Player1Score = 0;
            Player2Score = 0;
            GameTick = 0;
        }

        public async Task StartGameLoop(Func<Game, Task> onTick)
        {
            Console.WriteLine("Start Game Loop");
            Time = 3000;
            while (Time > 0)
            {
                await Task.Delay(1000);
                Time -= 1000;
                Console.WriteLine("1 second passed: " + Time);
                try
                {
                    Console.WriteLine("Before Sent onTick");
                    await onTick(this);
                    Console.WriteLine("After Sent onTick");
                }
                catch
                {
                    Console.WriteLine("Something went wrong uwu");
                }
            }
            State = GameState.InProgress;
            while (State == GameState.InProgress)
            {
                Console.WriteLine("Update Game State");
                UpdateGameState();
                Console.WriteLine("Before Sent onTick");
                await onTick(this);
                Console.WriteLine("After Sent onTick");
                await Task.Delay(TickInterval);
                Time += TickInterval;
                Console.WriteLine(TickInterval + "ms has passed: " + Time);
            }
        }

        public void MoveSnake(Snake snake)
        {
            char currentDirection = DirectionCommand[snake.PlayerId];

            for (int i = snake.Segments.Count - 1; i > 0; i--)
            {
                snake.Segments[i].X = snake.Segments[i - 1].X;
                snake.Segments[i].Y = snake.Segments[i - 1].Y;
                snake.Segments[i].Direction = snake.Segments[i - 1].Direction;
            }

            switch (currentDirection)
            {
                case 'l':
                    snake.Head.X -= 1;
                    snake.Head.Direction = "l";
                    break;
                case 'r':
                    snake.Head.X += 1;
                    snake.Head.Direction = "r";
                    break;
                case 'u':
                    snake.Head.Y -= 1;
                    snake.Head.Direction = "u";
                    break;
                case 'd':
                    snake.Head.Y += 1;
                    snake.Head.Direction = "d";
                    break;
            }

            // The tail will now take the position of the second-to-last segment
            // snake.Tail.X = snake.Segments[snake.Segments.Count - 2].X;
            // snake.Tail.Y = snake.Segments[snake.Segments.Count - 2].Y;
            // snake.Tail.Direction = snake.Segments[snake.Segments.Count - 2].Direction;

            // Update the EntityLayer to reflect the new position of the snake
            foreach (var segment in snake.Segments)
            {
                EntityLayer[segment.Y][segment.X] = segment;
            }
        }

        public void AddSnakeToEntityLayer(Snake snake)
        {
            foreach (IEntity segment in snake.Segments)
                EntityLayer[segment.Y][segment.X] = segment;
        }

        public void ReceiveDirectionCommand(string playerId, char command)
        {
            var curDirection = DirectionCommand[playerId];

            if ((curDirection == 'l' && command == 'r') ||
                (curDirection == 'r' && command == 'l') ||
                (curDirection == 'u' && command == 'd') ||
                (curDirection == 'd' && command == 'u'))
                return;
            DirectionCommand[playerId] = command;
        }

        // Update game state
        public void UpdateGameState()
        {
            // Implement game update logic, e.g., move snakes, check for collisions, etc.
            GameTick++;
            foreach (var sn in Snakes)
                MoveSnake(sn.Value);

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
            public int Time { get; private set; } = 3;

            public GameData(Game game)
            {
                GameId = game.GameId;
                Lobby = LobbyMappers.ToResponseDto((PrivateLobby)game.Lobby); // Change this when making Public option
                GroundLayer = game.GroundLayer;
                EntityLayer = EntityLayerToData(game.EntityLayer);
                Player1Score = game.Player1Score;
                Player2Score = game.Player2Score;
                GameTick = game.GameTick;
                Time = game.Time / 1000;
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