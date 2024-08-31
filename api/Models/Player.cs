using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class Player : IdentityUser
    {
        public string Token { get; set; } = string.Empty;
        public int Wins { get; set; } = 0;
        public int Losses { get; set; } = 0;
        public int Color { get; set; } = 0;
        public int Ability { get; set; } = 0;
        public DateTime LastLogin { get; set; } = DateTime.Now;
        public bool IsGuest { get; set; } = false;
        public string LobbyId { get; set; } = string.Empty;
        public string GameId { get; set; } = string.Empty;

        // Default constructor required by EF Core
        public Player()
        {

        }

        public Player(string username, string token)
        {
            UserName = username;
            Token = token;
        }

        public static Player Guest()
        {
            return new Player()
            {
                //PlayerId = Guid.NewGuid().ToString(),
                UserName = string.Concat("Guest_", Guid.NewGuid().ToString().AsSpan(0, 4)),
                //Password = string.Empty,
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.Now,
                IsGuest = true,
                LobbyId = string.Empty,
                GameId = string.Empty
            };
        }
    }
}