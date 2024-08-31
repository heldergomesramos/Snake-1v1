using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Player;

namespace api.Models
{
    public class Lobby
    {
        public string LobbyId { get; set; } = string.Empty;
        public string? HostPlayerId { get; set; } = string.Empty;
        public Player? HostPlayer { get; set; }
        public string? InviteePlayerId { get; set; } = string.Empty;
        public Player? InviteePlayer { get; set; }
        public bool GameStarted { get; set; } = false;
        public GameSettings? GameSettings { get; set; }
        public bool IsFull => HostPlayer != null && InviteePlayer != null;

        public Lobby() { }

        public Lobby(Player hostPlayer)
        {
            LobbyId = Guid.NewGuid().ToString();
            HostPlayerId = hostPlayer.Id;
            HostPlayer = hostPlayer;
            GameSettings = new();
            hostPlayer.LobbyId = LobbyId;
        }

        public void AddPlayer(Player newPlayer)
        {
            if (HostPlayer == null)
            {
                HostPlayer = newPlayer;
                HostPlayerId = newPlayer.Id;
            }
            else
            {
                InviteePlayer = newPlayer;
                InviteePlayerId = newPlayer.Id;
            }
            newPlayer.LobbyId = LobbyId;
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