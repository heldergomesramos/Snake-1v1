namespace api.Models
{
    public class Game
    {
        private static int tileVariations = 8;
        public string GameId { get; private set; } = string.Empty;
        public Lobby Lobby { get; private set; }

        public int[][] GroundLayer { get; private set; }
        public Entity[][] EntityLayer { get; private set; }

        public int Player1Score { get; private set; } = 0;
        public int Player2Score { get; private set; } = 0;
        public int GameTick { get; private set; } = 0;

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
    }
}