namespace api.Models
{
    public class Game
    {
        private static readonly int tileVariations = 16;
        public string GameId { get; private set; } = string.Empty;
        public Lobby Lobby { get; private set; }

        public int[][] GroundLayer { get; private set; }
        public Entity[][] EntityLayer { get; private set; }

        public int Player1Score { get; private set; } = 0;
        public int Player2Score { get; private set; } = 0;
        public int GameTick { get; private set; } = 0;

        // Maps <playerId, Snake>
        public Dictionary<string, Snake> Snakes { get; set; } = [];
        // Listens and changes direction based on player input (example: "Press A -> "left", dictionary maps<playerId,direction>)
        public Dictionary<string, string> DirectionCommand { get; set; } = [];

        public enum GameState
        {
            Waiting,
            InProgress,
            Finished
        }
        public GameState State { get; set; } = GameState.Waiting;

        public enum Entity
        {
            None,
            SnakePlayer1,
            SnakePlayer2,
            Apple,
            Obstacle
        }

        public class SnakeSegment
        {
            public int X { get; set; }
            public int Y { get; set; }
            public string Direction { get; set; } = string.Empty;
        }

        public class Snake
        {
            public List<SnakeSegment> Segments { get; set; } = [];
            public SnakeSegment Head { get; set; } = new();
            public SnakeSegment Tail { get; set; } = new();
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

            EntityLayer = new Entity[height][];
            for (int i = 0; i < height; i++)
            {
                EntityLayer[i] = new Entity[width];
                for (int j = 0; j < width; j++)
                    EntityLayer[i][j] = Entity.None;
            }

            Player1Score = 0;
            Player2Score = 0;
            GameTick = 0;
        }

        // Add or update the snake for a player
        public void AddOrUpdateSnake(string playerId, Snake snake)
        {
            Snakes[playerId] = snake;
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

        // Serialize game state to a format suitable for frontend consumption
        public object GetGameStateForClient()
        {
            // Implement serialization to the required format
            return new
            {
                GameId,
                GroundLayer,
                EntityLayer,
                Player1Score,
                Player2Score,
                GameTick,
                Snakes = Snakes.ToDictionary(
                    kvp => kvp.Key,
                    kvp => new
                    {
                        Segments = kvp.Value.Segments,
                        Head = kvp.Value.Head,
                        Tail = kvp.Value.Tail
                    }
                ),
                State
            };
        }
    }
}