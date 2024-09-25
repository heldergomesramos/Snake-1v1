using api.Dtos.Player;
using api.Models;

namespace api.Mappers
{
    public static class PlayerMappers
    {
        public static Player PlayerRegisterToPlayerEntity(PlayerRegisterRequestDto dto)
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

        public static Player PlayerSimplifiedToPlayerEntity(PlayerSimplified dto)
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

        public static PlayerRegisterResponseDto PlayerEntityToPlayerRegister(Player player, string token)
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

        public static PlayerSimplified PlayerEntityToPlayerSimplified(Player player)
        {
            return new PlayerSimplified
            {
                PlayerId = player.Id,
                Username = player.UserName!,
                IsGuest = player.IsGuest,
                Wins = player.Wins,
                Losses = player.Losses,
                Color = player.Color,
                Ability = player.Ability
            };
        }

        public static PlayerClient? PlayerSimplifiedToPlayerClient(PlayerSimplified? player)
        {
            if (player == null)
                return null;
            return new PlayerClient
            {
                PlayerId = player.PlayerId,
                Username = player.Username,
                Wins = player.Wins,
                Losses = player.Losses,
                Color = player.Color,
                Ability = player.Ability
            };
        }
    }
}