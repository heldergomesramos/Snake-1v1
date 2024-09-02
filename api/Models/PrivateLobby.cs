namespace api.Models
{
    public class PrivateLobby(Player player) : Lobby(player)
    {
        public string Code { get; private set; } = GenerateCode();

        private static string GenerateCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 6)
                .Select(s => s[random.Next(s.Length)])
                .ToArray());
        }
    }
}