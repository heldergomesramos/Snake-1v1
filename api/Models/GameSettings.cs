using System.Text.Json;

namespace api.Models
{
    public class GameSettings
    {
        public int Speed { get; set; } = 2;
        public int Width { get; set; } = 10;
        public int Height { get; set; } = 10;
        public int Time { get; set; } = 180;
        public bool Borders { get; set; } = false;
        public bool Abilities { get; set; } = true;
        public int Map { get; set; } = 0;

        public static GameSettings RandomSettings()
        {
            Random random = new();

            int width = random.Next(10, 21);
            int height = random.Next(10, 21);

            int totalSize = width * height;
            double sizeRatio = (double)totalSize / 400;

            // Define speed probabilities based on size ratio
            int speed;
            if (sizeRatio > 0.75)
                speed = random.Next(5, 7);
            else if (sizeRatio > 0.5)
                speed = random.Next(4, 6);
            else
                speed = random.Next(3, 5);

            return new GameSettings
            {
                Speed = speed,
                Width = random.Next(10, 21),
                Height = random.Next(10, 21),
                Time = 180,
                // Borders = random.Next(0, 2) == 1,
                Borders = false,
                Abilities = true,
                Map = random.Next(0, 2)
            };
        }

        public static GameSettings? ObjectToGameSettings(object settings)
        {
            if (settings == null)
                return null;

            if (settings is JsonElement jsonElement)
            {
                var gameSettings = new GameSettings();
                gameSettings.Speed = ProcessGameSetting(jsonElement, "speed", gameSettings.Speed, 1, 10);
                gameSettings.Width = ProcessGameSetting(jsonElement, "width", gameSettings.Width, 10, 40);
                gameSettings.Height = ProcessGameSetting(jsonElement, "height", gameSettings.Height, 10, 40);
                gameSettings.Time = ProcessGameSetting(jsonElement, "time", gameSettings.Time, 10, 999);
                gameSettings.Map = ProcessGameSettingLoop(jsonElement, "map", 2);
                gameSettings.Borders = ProcessGameBooleanSetting(jsonElement, "borders", gameSettings.Borders);
                gameSettings.Abilities = ProcessGameBooleanSetting(jsonElement, "abilities", gameSettings.Abilities);


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
                    return Math.Clamp(value, minValue, maxValue);
                else if (property.ValueKind == JsonValueKind.Number && property.TryGetInt32(out var numericValue))
                    return Math.Clamp(numericValue, minValue, maxValue);
            }
            return defaultValue; // Use the default if property doesn't exist, is null, or invalid
        }

        public static int ProcessGameSettingLoop(JsonElement jsonElement, string propertyName, int maxValue)
        {
            if (jsonElement.TryGetProperty(propertyName, out var property))
            {
                if (property.ValueKind == JsonValueKind.String && !string.IsNullOrEmpty(property.GetString()) &&
                    int.TryParse(property.GetString(), out var value))
                    return (value % maxValue + maxValue) % maxValue;
                else if (property.ValueKind == JsonValueKind.Number && property.TryGetInt32(out var numericValue))
                    return (numericValue % maxValue + maxValue) % maxValue;
            }
            return 0; // Use the default if property doesn't exist, is null, or invalid
        }

        public static bool ProcessGameBooleanSetting(JsonElement jsonElement, string propertyName, bool currentValue)
        {
            if (jsonElement.TryGetProperty(propertyName, out var property) &&
                (property.ValueKind == JsonValueKind.True || property.ValueKind == JsonValueKind.False))
                return property.GetBoolean();
            return currentValue;
        }

    }
}