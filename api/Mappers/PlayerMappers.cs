using api.Dtos.Player;
using api.Models;

namespace api.Mappers
{
    public static class PlayerMappers
    {
        public static Player ToPlayerEntity(PlayerRegisterRequestDto dto)
        {
            return new Player
            {
                UserName = dto.Username,
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.UtcNow,
                IsGuest = false,
            };
        }

        public static Player ToPlayerEntity(PlayerSimplified dto)
        {
            return new Player
            {
                UserName = dto.Username,
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.UtcNow,
                IsGuest = false,
            };
        }

        public static PlayerRegisterResponseDto ToResponseDto(Player player, string token)
        {
            return new PlayerRegisterResponseDto
            {
                PlayerId = player.Id,
                Username = player.UserName,
                IsGuest = player.IsGuest,
                Wins = player.Wins,
                Losses = player.Losses,
                Color = player.Color,
                Ability = player.Ability,
                Token = token
            };
        }

        public static PlayerSimplified ToSimplifiedResponseDto(Player player)
        {
            return new PlayerSimplified
            {
                PlayerId = player.Id,
                Username = player.UserName,
                IsGuest = player.IsGuest,
                Wins = player.Wins,
                Losses = player.Losses,
                Color = player.Color,
                Ability = player.Ability
            };
        }
    }
}