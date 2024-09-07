using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos.Player;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly UserManager<Player> _userManager;
        private readonly SignInManager<Player> _signInManager;
        private readonly ITokenService _tokenService;

        public PlayerService(
            UserManager<Player> userManager,
            SignInManager<Player> signInManager,
            ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        public async Task UpdatePlayerAsync(PlayerSimplified playerSimplified)
        {
            ArgumentNullException.ThrowIfNull(playerSimplified);

            var player = await _userManager.FindByIdAsync(playerSimplified.PlayerId);
            if (player == null)
                throw new InvalidOperationException($"Player with ID {playerSimplified.PlayerId} not found.");

            player.Ability = playerSimplified.Ability;
            player.Color = playerSimplified.Color;
            player.Wins = playerSimplified.Wins;
            player.Losses = playerSimplified.Losses;

            var result = await _userManager.UpdateAsync(player);
            if (!result.Succeeded)
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                throw new InvalidOperationException($"Failed to update player: {errors}");
            }
        }

        public async Task<PlayerSimplified?> GetPlayerSimplifiedByIdAsync(string id)
        {
            var player = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (player == null)
                return null;
            return PlayerMappers.ToSimplifiedResponseDto(player);
        }

        public async Task<List<PlayerSimplified>> GetAllPlayersSimplifiedAsync()
        {
            var players = await _userManager.Users.ToListAsync();
            return players.Select(PlayerMappers.ToSimplifiedResponseDto).ToList();
        }


        public async Task<PlayerRegisterResponseDto?> RegisterPlayerAsync(PlayerRegisterRequestDto dto)
        {
            var existingPlayer = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == dto.Username);
            if (existingPlayer != null)
                return null;

            var newPlayer = new Player
            {
                UserName = dto.Username,
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.UtcNow,
                IsGuest = false
            };

            var result = await _userManager.CreateAsync(newPlayer, dto.Password);
            if (!result.Succeeded)
                return null;

            await _userManager.AddToRoleAsync(newPlayer, "User");

            var token = _tokenService.CreateToken(newPlayer);

            var responseDto = PlayerMappers.ToResponseDto(newPlayer, token);

            return responseDto;
        }

        public async Task<PlayerRegisterResponseDto?> LoginPlayerAsync(PlayerRegisterRequestDto dto)
        {
            var player = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == dto.Username);

            if (player == null)
                return null;

            var result = await _signInManager.CheckPasswordSignInAsync(player, dto.Password, false);
            if (!result.Succeeded)
                return null;

            player.LastLogin = DateTime.UtcNow;
            await _userManager.UpdateAsync(player);

            var token = _tokenService.CreateToken(player);

            var responseDto = PlayerMappers.ToResponseDto(player, token);
            responseDto.Token = token;

            return responseDto;
        }

        public async Task<PlayerRegisterResponseDto?> CreateGuestAsync()
        {
            var guestUsername = $"Guest_{Guid.NewGuid().ToString()[..8]}";

            var guestPlayer = new Player
            {
                UserName = guestUsername,
                IsGuest = true,
                Wins = 0,
                Losses = 0,
                Color = 0,
                Ability = 0,
                LastLogin = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(guestPlayer);
            if (!result.Succeeded)
                return null;

            var token = _tokenService.CreateToken(guestPlayer);

            var guestPlayerDto = PlayerMappers.ToResponseDto(guestPlayer, token);

            return guestPlayerDto;
        }
    }
}
