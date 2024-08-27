using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Lobby
    {
        public string LobbyId { get; protected set; } = string.Empty;
        public string? HostPlayerId { get; set; } = string.Empty;
        public Player? HostPlayer { get; set; }
        public string? InviteePlayerId { get; set; } = string.Empty;
        public Player? InviteePlayer { get; set; }
        public bool GameStarted { get; protected set; }
        public string? GameSettingsId { get; protected set; } = string.Empty;
        public GameSettings? GameSettings { get; protected set; }
        public bool IsFull => HostPlayer != null && InviteePlayer != null;

        public Lobby() { }

        public Lobby(string hostPlayerId)
        {
            LobbyId = Guid.NewGuid().ToString();
            HostPlayerId = hostPlayerId;
            GameSettings = new();
            GameStarted = false;
        }

        public void StartGame()
        {
            GameStarted = true;
        }

        public void EndGame()
        {
            GameStarted = false;
        }
    }
}