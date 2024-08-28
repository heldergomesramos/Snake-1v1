using api.Dtos.Player;
using api.Models;

namespace api.Services
{
    public interface IPlayerService
    {
        Task<PlayerRegisterResponseDto?> RegisterPlayerAsync(PlayerRegisterRequestDto dto);
        Task<PlayerRegisterResponseDto?> LoginPlayerAsync(PlayerRegisterRequestDto dto);
        Task<Player?> GetPlayerByUsernameAsync(string username);
        Task<List<Player>> GetAllPlayersAsync();
    }
}
