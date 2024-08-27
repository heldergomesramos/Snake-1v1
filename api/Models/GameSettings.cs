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

        public GameSettings()
        {
            GameSettingsId = Guid.NewGuid().ToString();
            Speed = 1;
            Width = 10;
            Height = 10;
        }
    }
}