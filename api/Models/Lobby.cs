using api.Dtos.Player;

namespace api.Models
{
    public class Lobby
    {
        public string LobbyId { get; set; } = string.Empty;
        public PlayerSimplified? Player1 { get; set; }
        public PlayerSimplified? Player2 { get; set; }
        public bool GameStarted { get; set; } = false;
        public GameSettings? GameSettings { get; set; }
        public bool IsFull => Player1 != null && Player2 != null;
        public bool IsEmpty => Player1 == null && Player2 == null;

        public Lobby() { }

        public Lobby(PlayerSimplified player)
        {
            LobbyId = Guid.NewGuid().ToString();
            Player1 = player;
            GameSettings = new();
        }

        public void AddPlayer(PlayerSimplified newPlayer)
        {
            if (Player1 == null)
                Player1 = newPlayer;
            else
                Player2 = newPlayer;
            newPlayer.LobbyId = LobbyId;
        }

        public void StartGame()
        {
            GameStarted = true;
        }

        public void EndGame()
        {
            GameStarted = false;
        }
    }
}