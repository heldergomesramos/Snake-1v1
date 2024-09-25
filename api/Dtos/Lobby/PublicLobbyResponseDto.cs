using api.Dtos.Player;
using api.Models;

namespace api.Dtos.Lobby
{
    public class ToResponseDto
    {
        public PlayerClient? Player1 { get; set; }
        public PlayerClient? Player2 { get; set; }
        public GameSettings? GameSettings { get; set; }
    }
}