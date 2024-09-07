using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class Player : IdentityUser
    {
        public int Wins { get; set; } = 0;
        public int Losses { get; set; } = 0;
        public int Color { get; set; } = 0;
        public int Ability { get; set; } = 0;
        public DateTime LastLogin { get; set; } = DateTime.Now;
        public bool IsGuest { get; set; } = false;

        public Player() { }

        public static Player Guest()
        {
            return new Player()
            {
                UserName = string.Concat("Guest_", Guid.NewGuid().ToString().AsSpan(0, 4)),
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.Now,
                IsGuest = true,
            };
        }
    }
}