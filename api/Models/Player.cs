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

        // Default constructor required by EF Core
        public Player() { }

        public Player(string username)
        {
            PlayerId = Guid.NewGuid().ToString();
            Username = username;
        }
    }

}