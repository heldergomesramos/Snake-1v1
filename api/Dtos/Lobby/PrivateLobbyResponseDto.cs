using api.Dtos.Player;
using api.Models;

namespace api.Dtos.Lobby
{
    public class PrivateLobbyResponseDto
    {
        public string LobbyId { get; set; } = string.Empty;
        public PlayerRegisterResponseDto? Player1 { get; set; }
        public PlayerRegisterResponseDto? Player2 { get; set; }
        public bool GameStarted { get; set; } = false;
        public GameSettings? GameSettings { get; set; }
        public string Code { get; set; } = string.Empty;
        public bool IsFull => Player1 != null && Player2 != null;
    }
}