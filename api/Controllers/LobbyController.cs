using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Player;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/lobby")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        private Lobby _currentLobby = new();
        private List<Lobby> allLobies = [];

        private readonly ApplicationDBContext _context;
        public LobbyController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public IActionResult GetAll()
        {
            var lobbies = allLobies;
            return Ok(lobbies);
        }

        [HttpGet("details/{id}")]
        public IActionResult GetById([FromRoute] string id)
        {
            var lobby = allLobies.Find(x => x.LobbyId == id);

            if (lobby == null)
                return NotFound();
            return Ok(lobby);
        }

        [HttpPost("join-public-lobby")]
        public IActionResult JoinPublicLobby([FromBody] PlayerRegisterResponseDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Username))
                return BadRequest(new { message = "Player name is required." });

            if (_currentLobby == null || _currentLobby.IsFull)
            {
                _currentLobby = new Lobby(dto);
                allLobies.Add(_currentLobby);
            }
            else
                _currentLobby.AddPlayer(dto);

            if (_currentLobby.IsFull)
                _currentLobby.GameStarted = true;

            return Ok(new
            {
                status = "joined_lobby",
                lobby = _currentLobby
            });
        }
    }
}