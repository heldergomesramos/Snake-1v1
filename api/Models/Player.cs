using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Player
    {
        public string PlayerId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public int Wins { get; set; } = 0;
        public int Losses { get; set; } = 0;
        public int Color { get; set; } = 0;
        public int Ability { get; set; } = 0;
        public DateTime LastLogin { get; set; } = DateTime.Now;
        public bool IsGuest { get; set; } = false;

        // Default constructor required by EF Core
        public Player()
        {

        }

        public static Player Guest()
        {
            return new Player()
            {
                PlayerId = Guid.NewGuid().ToString(),
                Username = "Guest_" + Guid.NewGuid().ToString().Substring(0, 4),
                Password = string.Empty,
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.Now,
                IsGuest = true
            };
        }
    }
}