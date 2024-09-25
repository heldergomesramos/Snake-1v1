using api.Dtos.Player;
using api.Mappers;
using api.Models;
using api.Services;
using api.Singletons;
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
            var players = await _playerService.GetAllPlayersSimplifiedAsync();
            return Ok(players);
        }

        [HttpGet("all-connected")]
        public IActionResult GetAllConnectedPlayers()
        {
            var players = PlayerManager.GetAllConnectedPlayers();
            return Ok(players);
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetPlayerDetails(string id)
        {
            var player = await _playerService.GetPlayerSimplifiedByIdAsync(id);

            if (player == null)
                return NotFound("Player not found.");

            return Ok(player);
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

                        var responseDto = PlayerMappers.PlayerEntityToPlayerRegister(user, token);

                        return Ok(new { player = responseDto });
                    }
                    else
                        return StatusCode(500, new { message = roleResult.Errors });
                }
                else
                {
                    return StatusCode(409, new { message = createdUser.Errors });
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = e });
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] PlayerRegisterRequestDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var response = await _playerService.LoginPlayerAsync(dto);

            if (response == null)
                return Unauthorized(new { message = "Invalid username or password." });

            if (PlayerManager.IsPlayerConnected(response.PlayerId))
                return StatusCode(403, new { message = "Player is alredy connected." });
            return Ok(response);
        }

        [HttpPost("guest")]
        public IActionResult Guest()
        {
            var guestPlayerDto = _playerService.CreateGuest();
            if (guestPlayerDto == null)
                return StatusCode(500, new { message = "Failed to create guest player." });
            return Ok(new { status = "guest_joined", player = guestPlayerDto });
        }
    }
}