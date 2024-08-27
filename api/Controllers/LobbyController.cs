using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/lobby")]
    [ApiController]
    public class LobbyController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public LobbyController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var lobbies = _context.Lobbies.ToList();
            return Ok(lobbies);
        }

        [HttpGet("{id}")]
        public IActionResult GetById([FromRoute] string id)
        {
            var lobby = _context.Lobbies.Find(id);

            if (lobby == null)
                return NotFound();
            return Ok(lobby);
        }
    }
}