using api.Dtos.Player;
using api.Models;

namespace api.Dtos.Lobby
{
    public class PrivateLobbyResponseDto
    {
        public string LobbyId { get; set; } = string.Empty;
        public PlayerSimplified? Player1 { get; set; }
        public PlayerSimplified? Player2 { get; set; }
        public bool GameStarted { get; set; } = false;
        public GameSettings? GameSettings { get; set; }
        public string Code { get; set; } = string.Empty;
    }
}