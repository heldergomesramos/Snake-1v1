namespace api.Dtos.Player
{
    public class PlayerClient
    {
        public string PlayerId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public int Wins { get; set; } = 0;
        public int Losses { get; set; } = 0;
        public int Color { get; set; } = 0;
        public int Ability { get; set; } = 0;
    }
}