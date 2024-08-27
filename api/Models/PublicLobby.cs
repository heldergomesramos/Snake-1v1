using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class PublicLobby : Lobby
    {
        public PublicLobby(string lobbyId) : base(lobbyId)
        {
            GameSettings = new GameSettings();
        }
    }
}