using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Lobby;
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
                PlayerId = Guid.NewGuid().ToString(),
                Username = dto.Username,
                Password = dto.Password, // Needs Hashing
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.UtcNow,
                IsGuest = false
            };
        }

        public static PlayerRegisterResponseDto ToResponseDto(Player player)
        {
            return new PlayerRegisterResponseDto
            {
                PlayerId = player.PlayerId,
                Username = player.Username,
                IsGuest = player.IsGuest,
                Wins = player.Wins,
                Losses = player.Losses,
                Color = player.Color,
                Ability = player.Ability
            };
        }

        // Ignore this, i need to learn how to update
        // public static Player ToPlayerEntity(PlayerUpdateRequestDto dto)
        // {
        //     return new Player
        //     {
        //         PlayerId = Guid.NewGuid().ToString(),
        //         Username = dto.Username,
        //         //Password = dto.Password, // Needs Hashing
        //         Wins = 0,
        //         Losses = 0,
        //         Color = 0,
        //         Ability = 0,
        //         LastLogin = DateTime.UtcNow,
        //         IsGuest = false
        //     };
        // }
    }
}