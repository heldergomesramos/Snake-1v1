using System.Threading.Tasks;
using api.Dtos.Player;
using api.Mappers;
using api.Models;
using api.Repositories;

namespace api.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IPlayerRepository _playerRepository;

        public PlayerService(IPlayerRepository playerRepository)
        {
            _playerRepository = playerRepository;
        }

        public async Task<PlayerRegisterResponseDto?> RegisterPlayerAsync(PlayerRegisterRequestDto dto)
        {
            var existingPlayer = await _playerRepository.GetPlayerByUsernameAsync(dto.Username);

            if (existingPlayer != null)
            {
                return null;
            }

            var newPlayer = PlayerMappers.ToPlayerEntity(dto);
            await _playerRepository.AddPlayerAsync(newPlayer);
            return PlayerMappers.ToResponseDto(newPlayer);
        }

        public async Task<Player?> GetPlayerByUsernameAsync(string username)
        {
            return await _playerRepository.GetPlayerByUsernameAsync(username);
        }

        public async Task<List<Player>> GetAllPlayersAsync()
        {
            return await _playerRepository.GetAllPlayersAsync();
        }
    }
}
