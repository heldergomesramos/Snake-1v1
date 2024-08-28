using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Lobby
{
    public class CreateLobbyRequestDto
    {
        public string HostUsername { get; set; } = string.Empty;
    }
}