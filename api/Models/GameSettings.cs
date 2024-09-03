using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class GameSettings
    {
        public string GameSettingsId { get; set; } = string.Empty;
        public int Speed { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int Time { get; set; }
        public bool Borders { get; set; }
        public bool Abilities { get; set; }

        public GameSettings()
        {
            GameSettingsId = Guid.NewGuid().ToString();
            Speed = 2;
            Width = 14;
            Height = 14;
            Time = 150;
            Borders = false;
            Abilities = true;
        }
    }
}