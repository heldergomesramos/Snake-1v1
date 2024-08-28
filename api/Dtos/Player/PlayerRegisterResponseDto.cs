using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Player
{
    public class PlayerRegisterResponseDto
    {
        public string PlayerId { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public bool IsGuest { get; set; } = false;
        public int Wins { get; set; } = 0;
        public int Losses { get; set; } = 0;
        public int Color { get; set; } = 0;
        public int Ability { get; set; } = 0;
    }
}