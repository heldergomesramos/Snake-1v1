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
        public PlayerRegisterResponseDto? HostPlayer { get; set; }
        public string? InviteePlayerId { get; set; } = string.Empty;
        public PlayerRegisterResponseDto? InviteePlayer { get; set; }
        public bool GameStarted { get; set; } = false;
        public GameSettings? GameSettings { get; set; }
        public bool IsFull => HostPlayer != null && InviteePlayer != null;

        public Lobby() { }

        public Lobby(PlayerRegisterResponseDto hostPlayer)
        {
            LobbyId = Guid.NewGuid().ToString();
            HostPlayerId = hostPlayer.PlayerId;
            HostPlayer = hostPlayer;
            GameSettings = new();
        }

        public void AddPlayer(PlayerRegisterResponseDto newPlayer)
        {
            if (HostPlayer == null)
            {
                HostPlayer = newPlayer;
                HostPlayerId = newPlayer.PlayerId;
            }
            else
            {
                InviteePlayer = newPlayer;
                InviteePlayerId = newPlayer.PlayerId;
            }
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