using System.Diagnostics;
using System.Text.Json;

namespace api.Models
{
    public class GameSettings
    {
        public int Speed { get; set; } = 2;
        public int Width { get; set; } = 14;
        public int Height { get; set; } = 14;
        public int Time { get; set; } = 150;
        public bool Borders { get; set; } = false;
        public bool Abilities { get; set; } = true;
        public int Map { get; set; } = 0;

        public static GameSettings? ObjectToGameSettings(object settings)
        {
            if (settings == null)
                return null;

            if (settings is JsonElement jsonElement)
            {
                var gameSettings = new GameSettings();
                Console.WriteLine("Constructing Game Settings");
                if (jsonElement.TryGetProperty("speed", out var speedProperty) && speedProperty.TryGetInt32(out var speed))
                    gameSettings.Speed = speed;

                if (jsonElement.TryGetProperty("width", out var widthProperty) && widthProperty.TryGetInt32(out var width))
                    gameSettings.Width = width;

                if (jsonElement.TryGetProperty("height", out var heightProperty))
                {
                    //Console.WriteLine(1);
                    //if (heightProperty.TryGetInt32(out var height)) ;
                    //Console.WriteLine(heightProperty == null)
                    //if (heightProperty.TryGetInt32(out var height)) ;
                    //Console.WriteLine(2);
                    //gameSettings.Height = height;
                    //Console.WriteLine(3);
                }


                // if (jsonElement.TryGetProperty("height", out var heightProperty))
                // {
                //     Console.WriteLine("Height 1");
                //     if (heightProperty.ValueKind == JsonValueKind.String && int.TryParse(heightProperty.GetString(), out var heightFromString))
                //     {
                //         Console.WriteLine("Height 2");
                //         gameSettings.Height = heightFromString;
                //         Console.WriteLine("Height 3");
                //     }

                //     else if (heightProperty.TryGetInt32(out var height))
                //     {
                //         Console.WriteLine("Height 4");
                //         gameSettings.Height = height;
                //         Console.WriteLine("Height 5");
                //     }
                //     Console.WriteLine("Height 6");
                // }

                if (jsonElement.TryGetProperty("time", out var timeProperty) && timeProperty.TryGetInt32(out var time))
                    gameSettings.Time = time;

                if (jsonElement.TryGetProperty("borders", out var bordersProperty) &&
                   (bordersProperty.ValueKind == JsonValueKind.True || bordersProperty.ValueKind == JsonValueKind.False))
                {
                    gameSettings.Borders = bordersProperty.GetBoolean();
                }

                if (jsonElement.TryGetProperty("abilities", out var abilitiesProperty) &&
                   (abilitiesProperty.ValueKind == JsonValueKind.True || abilitiesProperty.ValueKind == JsonValueKind.False))
                {
                    gameSettings.Abilities = abilitiesProperty.GetBoolean();
                }

                if (jsonElement.TryGetProperty("map", out var mapProperty) && mapProperty.TryGetInt32(out var map))
                    gameSettings.Map = map;

                Console.WriteLine($"New GameSettings: Speed={gameSettings.Speed}, Width={gameSettings.Width}, Height={gameSettings.Height}, Time={gameSettings.Time}, Borders={gameSettings.Borders}, Abilities={gameSettings.Abilities}, Map={gameSettings.Map}");

                return gameSettings;
            }

            Console.WriteLine("Settings object is not a JsonElement.");
            return null;
        }
    }
}