using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Lobby;
using api.Models;

namespace api.Mappers
{
    public static class LobbyMappers
    {
        public static Lobby ToLobbyFromCreateDTO(this CreateLobbyRequestDto lobbyDto)
        {
            return new Lobby()
            {
                // HostPlayer = lobbyDto.HostPlayer;
            };
        }
    }
}