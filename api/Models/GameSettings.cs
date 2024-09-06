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
                gameSettings.Speed = ProcessGameSetting(jsonElement, "speed", gameSettings.Speed, 1, 10);
                gameSettings.Width = ProcessGameSetting(jsonElement, "width", gameSettings.Width, 10, 50);
                gameSettings.Height = ProcessGameSetting(jsonElement, "height", gameSettings.Height, 10, 50);
                gameSettings.Time = ProcessGameSetting(jsonElement, "time", gameSettings.Time, 10, 999);
                gameSettings.Map = ProcessGameSetting(jsonElement, "map", gameSettings.Map, 0, 1);

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

                Console.WriteLine($"New GameSettings: Speed={gameSettings.Speed}, Width={gameSettings.Width}, Height={gameSettings.Height}, Time={gameSettings.Time}, Borders={gameSettings.Borders}, Abilities={gameSettings.Abilities}, Map={gameSettings.Map}");

                return gameSettings;
            }

            Console.WriteLine("Settings object is not a JsonElement.");
            return null;
        }

        public static int ProcessGameSetting(JsonElement jsonElement, string propertyName, int defaultValue, int minValue, int maxValue)
        {
            if (jsonElement.TryGetProperty(propertyName, out var property))
            {
                if (property.ValueKind == JsonValueKind.String && !string.IsNullOrEmpty(property.GetString()) &&
                    int.TryParse(property.GetString(), out var value))
                {
                    // Clamp the value within the allowed range
                    return Math.Clamp(value, minValue, maxValue);
                }
                else if (property.ValueKind == JsonValueKind.Number && property.TryGetInt32(out var numericValue))
                {
                    // Handle case where the property is an actual number
                    return Math.Clamp(numericValue, minValue, maxValue);
                }
            }
            return defaultValue; // Use the default if property doesn't exist, is null, or invalid
        }

    }
}