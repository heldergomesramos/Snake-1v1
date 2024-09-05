using api.Dtos.Lobby;
using api.Dtos.Player;
using api.Hubs;
using api.Mappers;
using api.Models;
using api.Services;
using api.Singletons;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace api.Controllers
{
    [Route("api/lobby")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        private readonly IPlayerService _playerService;
        private readonly ILogger<LobbyController> _logger;
        private readonly IHubContext<LobbyHub> _hubContext;

        // Constructor to inject ILogger
        public LobbyController(ILogger<LobbyController> logger, IPlayerService playerService, IHubContext<LobbyHub> hubContext)
        {
            _logger = logger;
            _playerService = playerService;
            _hubContext = hubContext;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var lobbies = LobbyManager.AllLobbiesCopy;
            return Ok(lobbies);
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById([FromRoute] string id)
        {
            var lobby = LobbyManager.GetPrivateLobbyById(id);
            if (lobby == null)
                return NotFound();
            return Ok(new { lobby = LobbyMappers.ToResponseDto(lobby) });
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
        public async Task<IActionResult> CreatePrivateLobby([FromBody] PlayerIdDto dto)
        {
            if (dto == null)
                return BadRequest(new { status = "error", message = "Request body cannot be null." });
            if (string.IsNullOrEmpty(dto.PlayerId))
                return BadRequest(new { status = "error", message = "Player Id is required." });
            var player = await _playerService.GetPlayerByIdAsync(dto.PlayerId);
            if (player == null)
                return NotFound(new { status = "error", message = $"Player with id '{dto.PlayerId}' not found." });
            if (player.LobbyId != string.Empty)
                return Conflict(new { status = "error", message = "Player is already in a lobby." });

            Console.WriteLine("\nCreate Private Lobby from: " + player.UserName);
            PrivateLobbyResponseDto? lobbyToReturn = await LobbyManager.CreatePrivateLobby(player, _hubContext);
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

        [HttpPost("join-private-lobby")]
        public async Task<IActionResult> JoinPrivateLobby([FromBody] JoinPrivateLobbyRequestDto dto)
        {
            if (dto == null)
                return BadRequest(new { status = "error", message = "Request body cannot be null." });
            if (string.IsNullOrEmpty(dto.PlayerId))
                return BadRequest(new { status = "error", message = "Player Id is required." });
            var player = await _playerService.GetPlayerByIdAsync(dto.PlayerId);
            if (player == null)
                return NotFound(new { status = "error", message = $"Player with id '{dto.PlayerId}' not found." });
            if (player.LobbyId != string.Empty)
                return Conflict(new { status = "error", message = "Player is already in a lobby." });

            PrivateLobbyResponseDto? lobbyToReturn = await LobbyManager.JoinPrivateLobby(player, dto.LobbyCode, _hubContext);
            if (lobbyToReturn == null)
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = "error", message = "Failed to join lobby. Please try again later." });

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

        [HttpPost("leave-private-lobby")]
        public async Task<IActionResult> LeavePrivateLobby([FromBody] PlayerIdDto dto)
        {
            Console.WriteLine("\nLeave Private Lobby from: " + dto.PlayerId);
            if (dto == null)
                return BadRequest(new { status = "error", message = "Request body cannot be null." });
            if (string.IsNullOrEmpty(dto.PlayerId))
                return BadRequest(new { status = "error", message = "Player Id is required." });
            var player = await _playerService.GetPlayerByIdAsync(dto.PlayerId);
            if (player == null)
                return NotFound(new { status = "error", message = $"Player with id '{dto.PlayerId}' not found." });
            if (player.LobbyId == string.Empty)
                return Conflict(new { status = "error", message = "Player is not in a lobby." });

            await LobbyManager.LeavePrivateLobby(player.Id, player.LobbyId, _hubContext);

            try
            {
                player.LobbyId = string.Empty;
                await _playerService.UpdatePlayerAsync(player);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { status = "error", message = $"Failed to update player: {ex.Message}" });
            }
            Console.WriteLine("Everything good, return left_lobby status.");
            return Ok(new
            {
                status = "left_lobby",
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
