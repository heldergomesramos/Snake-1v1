namespace api.Dtos.Lobby
{
    public class JoinPrivateLobbyRequestDto
    {
        public string PlayerId { get; set; } = string.Empty;
        public string LobbyCode { get; set; } = string.Empty;
    }
}