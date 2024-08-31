using api.Dtos.Player;
using api.Models;
using api.Singletons;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/lobby")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        private readonly ILogger<LobbyController> _logger;

        // Constructor to inject ILogger
        public LobbyController(ILogger<LobbyController> logger)
        {
            _logger = logger;
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

        [HttpDelete("all")]
        public IActionResult DeleteAllLobbies()
        {
            _logger.LogWarning("DeleteAllLobbies() executed");
            LobbyManager.DeleteAllLobbies();
            return NoContent();
        }
    }
}
