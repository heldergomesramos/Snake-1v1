using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Player;
using api.Mappers;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/player")]
    [ApiController]
    public class PlayerController : ControllerBase
    {
        private readonly UserManager<Player> _userManager;
        private readonly IPlayerService _playerService;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<Player> _signInManager;

        public PlayerController(UserManager<Player> userManager, IPlayerService playerService, ITokenService tokenService, SignInManager<Player> signInManager)
        {
            _userManager = userManager;
            _playerService = playerService;
            _tokenService = tokenService;
            _signInManager = signInManager;
        }

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
                return NotFound("Player not found.");

            var playerDto = PlayerMappers.ToResponseDto(player);
            return Ok(playerDto);
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] PlayerRegisterRequestDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                var user = new Player
                {
                    UserName = dto.Username,
                };

                var createdUser = await _userManager.CreateAsync(user, dto.Password);

                if (createdUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(user, "User");

                    if (roleResult.Succeeded)
                    {
                        var token = _tokenService.CreateToken(user);

                        var responseDto = PlayerMappers.ToResponseDto(user);
                        responseDto.Token = token;

                        return Ok(responseDto);
                    }
                    else
                        return StatusCode(500, roleResult.Errors);
                }
                else
                {
                    return StatusCode(500, createdUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] PlayerRegisterRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var response = await _playerService.LoginPlayerAsync(dto);

            if (response == null)
                return Unauthorized("Invalid username or password.");

            return Ok(response);
        }

        [HttpPost("guest")]
        public async Task<IActionResult> Guest()
        {
            var guestPlayerDto = await _playerService.CreateGuestAsync();
            if (guestPlayerDto == null)
                return StatusCode(500, new { message = "Failed to create guest player." });
            return Ok(new { status = "guest_joined", player = guestPlayerDto });
        }
    }
}