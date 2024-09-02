using api.Dtos.Player;
using api.Models;
using api.Services;
using api.Singletons;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/lobby")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly ILogger<LobbyController> _logger;

        // Constructor to inject ILogger
        public LobbyController(ILogger<LobbyController> logger, IPlayerService playerService)
        {
            _logger = logger;
            _playerService = playerService;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var lobbies = LobbyManager.AllLobbies;
            return Ok(lobbies);
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById([FromRoute] string id)
        {
            var lobby = LobbyManager.AllLobbies.Find(x => x.LobbyId == id);

            if (lobby == null)
                return NotFound();
            return Ok(lobby);
        }

        [HttpPost("join-public-lobby")]
        public IActionResult JoinPublicLobby([FromBody] PlayerRegisterResponseDto dto)
        {
            var _lobbyToReturn = LobbyManager.JoinPublicLobby(dto);

            if (_lobbyToReturn == null)
                return BadRequest();

            return Ok(new
            {
                status = "joined_lobby",
                lobby = _lobbyToReturn
            });
        }

        [HttpPost("create-private-lobby")]
        public async Task<IActionResult> CreatePrivateLobby([FromBody] PlayerRegisterResponseDto dto)
        {
            if (dto == null)
                return BadRequest(new { status = "error", message = "Request body cannot be null." });
            if (string.IsNullOrEmpty(dto.Username))
                return BadRequest(new { status = "error", message = "Username is required." });
            var player = await _playerService.GetPlayerByIdAsync(dto.PlayerId);
            if (player == null)
                return NotFound(new { status = "error", message = $"Player with username '{dto.Username}' not found." });
            if (player.LobbyId != string.Empty)
                return Conflict(new { status = "error", message = "Player is already in a lobby." });

            var lobbyToReturn = LobbyManager.CreatePrivateLobby(player);
            if (lobbyToReturn == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = "error", message = "Failed to create lobby. Please try again later." });

            try
            {
                player.LobbyId = lobbyToReturn.LobbyId;
                await _playerService.UpdatePlayerAsync(player);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = "error", message = $"Failed to update player: {ex.Message}" });
            }

            return Ok(new
            {
                status = "joined_lobby",
                lobby = lobbyToReturn
            });
        }

        [HttpDelete("all")]
        public IActionResult DeleteAllLobbies()
        {
            _logger.LogWarning("DeleteAllLobbies() executed");
            LobbyManager.DeleteAllLobbies();
            return NoContent();
        }
    }
}
