using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Player;
using api.Mappers;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/player")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly IPlayerService _playerService;

        public PlayerController(IPlayerService playerService)
        {
            _playerService = playerService;
        }

        // [HttpPost]
        // public IActionResult Create([FromBody] LoginPlayerRequestDto playerDto)
        // {
        //     var playerModel = playerDto.ToPlayerFromLoginDTO();
        //     _context.Players.Add(playerModel);
        //     _context.SaveChanges();
        //     return CreatedAtAction(nameof(GetById), new { id = playerModel.id }, playerModel.ToPlayerFromLoginDTO);
        // }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllPlayers()
        {
            var players = await _playerService.GetAllPlayersAsync();

            var playerDtos = players.Select(player => PlayerMappers.ToResponseDto(player)).ToList();
            return Ok(playerDtos);
        }

        [HttpGet("details/{username}")]
        public async Task<IActionResult> GetPlayerDetails(string username)
        {
            var player = await _playerService.GetPlayerByUsernameAsync(username);

            if (player == null)
            {
                return NotFound("Player not found.");
            }

            var playerDto = PlayerMappers.ToResponseDto(player);
            return Ok(playerDto);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] PlayerRegisterRequestDto dto)
        {
            if (dto == null)
            {
                return BadRequest(new { message = "Invalid registration request." });
            }

            var result = await _playerService.RegisterPlayerAsync(dto);

            if (result == null)
            {
                return Conflict(new { message = "Username already exists." });
            }

            return Ok(new { status = "registered", player = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] PlayerRegisterRequestDto dto)
        {
            var result = await _playerService.LoginPlayerAsync(dto);

            if (result == null)
            {
                return Unauthorized(new { message = "Invalid username or password." });
            }

            return Ok(new { status = "logged_in", player = result });
        }
    }
}