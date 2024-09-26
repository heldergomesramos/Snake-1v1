using api.Dtos.Player;

namespace api.Models
{
    public class GenericLobby
    {
        public string LobbyId { get; set; } = string.Empty;
        public PlayerSimplified? Player1 { get; set; }
        public PlayerSimplified? Player2 { get; set; }
        public bool GameStarted { get; set; } = false;
        public GameSettings? GameSettings { get; set; }
        public bool IsFull => Player1 != null && Player2 != null;
        public bool IsEmpty => Player1 == null && Player2 == null;

        /* Only used in private lobbies */
        public string Code { get; private set; } = GenerateCode();

        private static string GenerateCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)])
                .ToArray());
        }

        public GenericLobby() { }

        public GenericLobby(PlayerSimplified player)
        {
            LobbyId = Guid.NewGuid().ToString();
            Player1 = player;
            GameSettings = new();
        }

        public GenericLobby(PlayerSimplified player1, PlayerSimplified player2)
        {
            LobbyId = Guid.NewGuid().ToString();
            Player1 = player1;
            Player2 = player2;
            GameSettings = GameSettings.RandomSettings();
        }

        public void AddPlayer(PlayerSimplified newPlayer)
        {
            if (Player1 == null)
                Player1 = newPlayer;
            else
                Player2 = newPlayer;
            newPlayer.Lobby = this;
        }
    }
}