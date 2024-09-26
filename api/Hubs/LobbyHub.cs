using api.Dtos.Lobby;
using api.Mappers;
using api.Models;
using api.Services;
using api.Singletons;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace api.Hubs
{
    public class LobbyHub : Hub
    {
        private readonly IPlayerService _playerService;
        private readonly IHubContext<LobbyHub> _hubContext;

        public LobbyHub(IPlayerService playerService, IHubContext<LobbyHub> hubContext)
        {
            _playerService = playerService;
            _hubContext = hubContext;
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            if (httpContext != null)
            {
                var playerId = httpContext.Request.Query["playerId"].ToString();
                await PlayerManager.AddConnectionAsync(playerId, Context.ConnectionId, _playerService);
                Console.WriteLine($"Player {playerId} connected with ConnectionId: {Context.ConnectionId}");
            }
            else
            {
                Console.WriteLine($"No valid query received from: {Context.ConnectionId}");
            }
            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Console.WriteLine($"\nOn Disconnected Async Called, connection Id: " + Context.ConnectionId);
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player != null)
            {
                if (player.Game != null)
                    await LeaveGame();
                else if (player.Lobby != null)
                    await LobbyManager.LeaveLobby(player, _hubContext);
                if (LobbyManager.PlayerInPublicQueue == player)
                    LobbyManager.PlayerInPublicQueue = null;
                await _playerService.UpdatePlayerAsync(player);
                PlayerManager.RemoveConnection(Context.ConnectionId);
            }
            await base.OnDisconnectedAsync(exception);
        }

        public async Task JoinPublicLobby()
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null || player.Lobby != null)
                return;
            Console.WriteLine("Join Public Lobby by: " + player.Username);
            Console.WriteLine("Is Anyone in Queue? " + LobbyManager.PlayerInPublicQueue?.Username);
            var lobby = LobbyManager.JoinPublicLobby(player);
            Console.WriteLine("Lobby found: " + lobby);
            if (lobby == null)
                return;
            if (lobby.Player1 == null || lobby.Player2 == null)
            {
                /* There is no way this is ever going to happen */
                Console.WriteLine("[ERROR] Join Public Lobby - Problem with one player");
                LobbyManager.RemovePublicLobby(lobby);
                return;
            }
            var connection1 = PlayerManager.GetConnectionIdByPlayerId(lobby.Player1.PlayerId);
            var connection2 = PlayerManager.GetConnectionIdByPlayerId(lobby.Player2.PlayerId);
            if (connection1 == null || connection2 == null)
            {
                Console.WriteLine("[ERROR] Join Public Lobby - Problem with one connection");
                LobbyManager.RemovePublicLobby(lobby);
                return;
            }
            lobby.Player1.Lobby = lobby;
            lobby.Player2.Lobby = lobby;
            await Groups.AddToGroupAsync(connection1, lobby.LobbyId);
            await Groups.AddToGroupAsync(connection2, lobby.LobbyId);
            await StartGame();
        }

        // public async Task PublicLobbyDecline()
        // {
        //     var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
        //     if (player == null || player.Lobby == null)
        //         return;
        //     await LobbyManager.LeavePublicLobby(player.Lobby, _hubContext);
        // }

        public void StopQueue()
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null)
                return;
            if (LobbyManager.PlayerInPublicQueue == player)
                LobbyManager.PlayerInPublicQueue = null;
        }

        public async Task UpdatePrivateLobbySettings(object newSettings)
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null || player.Lobby == null)
                return;
            var newGameSettings = GameSettings.ObjectToGameSettings(newSettings);
            if (newGameSettings == null)
                return;
            player.Lobby.GameSettings = newGameSettings;
            await Clients.Group(player.Lobby.LobbyId).SendAsync("LobbyUpdated", LobbyMappers.ToResponseDto(player.Lobby));
        }

        public async Task UpdatePlayerInPrivateLobby(int color, int ability)
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null || player.Lobby == null)
                return;

            player.UpdateColor(color);
            player.UpdateAbility(ability);

            await Clients.Group(player.Lobby.LobbyId).SendAsync("LobbyUpdated", LobbyMappers.ToResponseDto(player.Lobby));
            await _playerService.UpdatePlayerAsync(player);
        }

        public async Task UpdatePlayer(int color, int ability)
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null)
                return;

            Console.WriteLine("\nReceived UpdatePlayerInLobby for player: " + player.PlayerId + " color: " + color + " ability: " + ability);

            player.UpdateColor(color);
            player.UpdateAbility(ability);

            await Clients.Caller.SendAsync("PlayerUpdated", player.Color, player.Ability);
            await _playerService.UpdatePlayerAsync(player);
        }


        public async Task StartGame()
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            Console.WriteLine("Start Game()");
            if (player == null || player.Lobby == null || player.Game != null || player.Lobby.GameStarted)
                return;
            var lobby = player.Lobby;
            lobby.GameStarted = true;
            var game = GameManager.CreateGame(lobby);

            if (lobby.Player1 != null)
                lobby.Player1.Game = game;

            if (lobby.Player2 != null)
                lobby.Player2.Game = game;

            Console.WriteLine("Send this game: " + game.GameId);
            await Clients.Group(lobby.LobbyId).SendAsync("StartGame", game.ToResponseDto());

            _ = Task.Run(() => game.StartGameLoop(async (gameState) =>
               {
                   Console.WriteLine("Broadcast game state: " + gameState);
                   Console.WriteLine("New Time being sent: " + gameState.ToResponseDto().Time);
                   try
                   {
                       await _hubContext.Clients.Group(lobby.LobbyId).SendAsync("UpdateGameState", gameState.ToResponseDto());
                   }
                   catch (Exception ex)
                   {
                       Console.WriteLine("Exception during SendAsync:");
                       Console.WriteLine(ex.ToString()); // Print exception details
                   }
               }));
        }

        public void UpdateDirectionCommand(char direction)
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null || player.Game == null)
                return;
            GameManager.UpdateDirectionCommand(player.PlayerId, player.Game.GameId, direction);
        }

        public async Task LeaveGame()
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null)
                return;
            var game = player.Game;
            if (game == null)
            {
                await Clients.Caller.SendAsync("LeaveGame");
                player.Lobby = null;
                player.Game = null;
                return;
            }
            game.HandleDisconnection(player.PlayerId);
            var lobby = game.Lobby;
            var leavingPlayer = lobby.Player1?.PlayerId == player.PlayerId ? lobby.Player1 : lobby.Player2;
            var remainingPlayer = lobby.Player1?.PlayerId != player.PlayerId ? lobby.Player1 : lobby.Player2;

            // Notify the player who is leaving
            if (leavingPlayer != null)
            {
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(leavingPlayer.PlayerId);
                if (connectionId != null)
                {
                    await Clients.Client(connectionId).SendAsync("LeaveGame");
                    await Groups.RemoveFromGroupAsync(connectionId, lobby.LobbyId);
                }

                leavingPlayer.Lobby = null;
                leavingPlayer.Game = null;
            }

            // Notify the remaining player with the updated game state
            if (remainingPlayer != null)
            {
                var connectionId = PlayerManager.GetConnectionIdByPlayerId(remainingPlayer.PlayerId);
                if (connectionId != null)
                {
                    await Clients.Client(connectionId).SendAsync("UpdateGameState", game.ToResponseDto());
                    await Clients.Client(connectionId).SendAsync("RematchResponse", "disabled");
                    await Groups.RemoveFromGroupAsync(connectionId, lobby.LobbyId);
                }

                remainingPlayer.Lobby = null;
                remainingPlayer.Game = null;
            }

            GameManager.RemoveGame(game.GameId);
            LobbyManager.RemovePrivateLobby(lobby);
        }

        public async Task AskRematch()
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null)
                return;
            var game = player.Game;
            if (game == null || game.Lobby.Player1 == null || game.Lobby.Player2 == null)
            {
                await Clients.Caller.SendAsync("RematchResponse", "disabled");
                return;
            }
            game.WantsRematch(player.PlayerId);
            if (game.Player1WantsRematch && game.Player2WantsRematch)
            {
                GameManager.RemoveGame(game.GameId);
                player.Game = null;
                await StartGame();
            }
            else
            {
                bool wantsRematch = game.Lobby.Player1.PlayerId == player.PlayerId ? game.Player1WantsRematch : game.Player2WantsRematch;
                await Clients.Caller.SendAsync("RematchResponse", wantsRematch ? "locked-in" : "normal");
            }
        }

        public async Task PlayAgain()
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null || player.Game == null || player.Game.GState == Game.GameState.Waiting)
                return;

            GameManager.RemoveGame(player.Game.GameId);
            player.Game = null;
            await StartGame();
        }

        public void ActivateAbility()
        {
            var player = PlayerManager.GetPlayerSimplifiedByConnectionId(Context.ConnectionId);
            if (player == null || player.Game == null)
                return;
            var game = player.Game;
            if (game.GState == Game.GameState.Finished)
                return;
            game.UseAbility(player.PlayerId);
        }

        /* Static Methods */

        public static async Task AddPlayerToLobby(string playerId, GenericLobby lobby, object lobbyDto, IHubContext<LobbyHub> hubContext)
        {
            var connectionId = PlayerManager.GetConnectionIdByPlayerId(playerId);
            if (string.IsNullOrEmpty(connectionId))
                return;
            await hubContext.Groups.AddToGroupAsync(connectionId, lobby.LobbyId);
            await hubContext.Clients.Group(lobby.LobbyId).SendAsync("LobbyUpdated", lobbyDto);
        }

        public static async Task UpdateLobby(string lobbyId, object lobbyDto, IHubContext<LobbyHub> hubContext)
        {
            await hubContext.Clients.Group(lobbyId).SendAsync("LobbyUpdated", lobbyDto);
        }
    }
}
