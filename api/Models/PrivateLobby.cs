using api.Dtos.Player;

namespace api.Models
{
    public class PrivateLobby(PlayerSimplified player) : GenericLobby(player)
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