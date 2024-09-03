using Microsoft.AspNetCore.SignalR;

namespace api.Hubs
{
    public class LobbyHub : Hub
    {
        /* !!! Currently Useless Class !!! */

        // Optionally, handle when a client connects
        public override async Task OnConnectedAsync()
        {
            // You can add custom logic here when a client connects
            await base.OnConnectedAsync();
        }

        // Optionally, handle when a client disconnects
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            // You can add custom logic here when a client disconnects
            await base.OnDisconnectedAsync(exception);
        }
    }
}