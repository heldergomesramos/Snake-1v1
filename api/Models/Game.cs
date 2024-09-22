using api.Controllers;
using api.Dtos.Lobby;
using api.Dtos.Player;
using api.Mappers;
using Microsoft.VisualBasic;

namespace api.Models
{
    public class Game
    {
        public static readonly int SWAP_COOLDOWN = 10000;
        public static readonly int FREEZE_COOLDOWN = 15000;
        public static readonly int GHOST_COOLDOWN = 20000;
        public static readonly int FREEZE_TURNS = 5;
        public static readonly int GHOST_TURNS = 3;

        private static readonly int tileVariations = 16;
        public string GameId { get; private set; } = string.Empty;
        public Lobby Lobby { get; private set; }
        public bool IsSinglePlayer { get; private set; } = false;

        public int[][] GroundLayer { get; private set; }
        public IEntity?[][] EntityLayer { get; private set; }

        /* This should be in a separate ingame player class */
        public int Player1Score { get; private set; } = 0;
        public int Player2Score { get; private set; } = 0;
        public int Player1Cooldown { get; private set; } = 0;
        public int Player2Cooldown { get; private set; } = 0;
        public bool Player1WantsRematch { get; private set; } = false;
        public bool Player2WantsRematch { get; private set; } = false;

        public int GameTick { get; private set; } = 0;
        public int Time { get; private set; } = 3000;
        public int TickInterval { get; private set; } = 0;

        public Dictionary<string, Snake> Snakes { get; private set; } = [];
        public Dictionary<string, char> DirectionCommand { get; private set; } = [];
        public Apple? CurApple { get; private set; }

        public string[][] EntityLayerDataCopy { get; private set; }

        public enum GameState
        {
            Waiting,
            InProgress,
            Finished
        }
        public GameState GState { get; set; } = GameState.Waiting;

        public enum FinishedState
        {
            NotFinished,
            Player1Disconnected,
            Player2Disconnected,
            Player1WonByTimeOut,
            Player2WonByTimeOut,
            Player1WonByCollision,
            Player2WonByCollision,
            DrawByTimeOut,
            DrawByCollision,
            SinglePlayerTimeOut,
            SinglePlayerCollision
        }
        public FinishedState FState { get; set; } = FinishedState.NotFinished;

        public abstract class IEntity(int x, int y)
        {
            public int X { get; set; } = x;
            public int Y { get; set; } = y;
            public abstract string ToData();
        }

        public class SnakeSegment(int x, int y, string direction, string type, int playerNumber) : IEntity(x, y)
        {
            public int PlayerNumber { get; set; } = playerNumber;
            public string Direction { get; set; } = direction;
            public string Type { get; set; } = type;

            public override string ToData()
            {
                return $"snake{PlayerNumber}-{Type}-{Direction}";
            }

            public override string ToString()
            {
                return ToData() + "-" + X + "-" + Y;
            }
        }

        public class Apple(int x, int y) : IEntity(x, y)
        {
            public override string ToData()
            {
                return "apple";
            }
        }

        public class Snake
        {
            public string PlayerId { get; set; } = string.Empty;
            public int PlayerNumber;
            public LinkedList<SnakeSegment> Segments { get; set; } = [];
            public SnakeSegment Head { get; set; }
            public SnakeSegment Tail { get; set; }
            public bool HasCollided { get; set; } = false;
            public bool HasSwapped { get; set; } = false;
            public int FrozenMoves { get; set; } = 0;
            public Game Game { get; set; }

            public Snake(string playerId, int playerNumber, int gameHeight, int gameWidth, Game game)
            {
                Game = game;
                PlayerId = playerId;
                PlayerNumber = playerNumber;
                int y; // Vertical position (row)
                int tailX, bodyX, headX; // Horizontal positions (columns)
                // Determine the vertical position based on the board height (center-ish)
                if (gameHeight % 2 == 0)
                {
                    // If the board height is even, snake 1 is at index 4, snake 2 at index 5
                    y = playerNumber == 1 ? (gameHeight / 2) - 1 : (gameHeight / 2);
                }
                else
                {
                    // If the board height is odd, snake 1 is at index 4, snake 2 at index 6
                    y = playerNumber == 1 ? (gameHeight / 2) - 1 : (gameHeight / 2) + 1;
                }

                if (playerNumber == 1)
                {
                    // Snake 1 faces right
                    tailX = 1; // Tail near the left edge
                    bodyX = 2;
                    headX = 3; // Head points towards the right
                }
                else
                {
                    // Snake 2 faces left
                    tailX = gameWidth - 2; // Tail near the right edge
                    bodyX = gameWidth - 3;
                    headX = gameWidth - 4; // Head points towards the left
                }

                // Create the segments for the snake
                Tail = new SnakeSegment(tailX, y, playerNumber == 1 ? "r" : "l", "tail", playerNumber);
                var body = new SnakeSegment(bodyX, y, "h", "body", playerNumber);
                Head = new SnakeSegment(headX, y, playerNumber == 1 ? "r" : "l", "head", playerNumber);

                Segments.AddLast(body);
            }

            public void Swap(string playerId)
            {
                var headX = Head.X;
                var headY = Head.Y;
                var headDir = Head.Direction;

                Head.X = Tail.X;
                Head.Y = Tail.Y;
                Head.Direction = GetOppositeDirection(Tail.Direction);

                Tail.X = headX;
                Tail.Y = headY;
                Tail.Direction = GetOppositeDirection(headDir);

                if (Segments.Count > 1)
                {
                    var reversedSegments = new LinkedList<SnakeSegment>(Segments);
                    Segments.Clear();
                    foreach (var segment in reversedSegments.Reverse())
                        Segments.AddLast(segment);
                }

                Game.DirectionCommand[playerId] = Head.Direction[0];
                HasSwapped = true;
            }

            public void Freeze()
            {
                FrozenMoves = FREEZE_TURNS;
            }
        }

        private static string GetOppositeDirection(string ogDirection)
        {
            return ogDirection switch
            {
                "l" => "r",
                "u" => "d",
                "r" => "l",
                "d" => "u",
                _ => " ",
            };
        }

        public Game(Lobby lobby)
        {
            if (lobby == null || lobby.GameSettings == null)
            {
                throw new ArgumentException("Lobby and its GameSettings cannot be null.");
            }
            GameId = Guid.NewGuid().ToString();
            Lobby = lobby;
            IsSinglePlayer = Lobby.Player1 == null || Lobby.Player2 == null;
            var height = Lobby.GameSettings.Height;
            var width = Lobby.GameSettings.Width;
            TickInterval = 1000 / Lobby.GameSettings.Speed;

            GroundLayer = new int[height][];
            for (int i = 0; i < height; i++)
            {
                GroundLayer[i] = new int[width];
                for (int j = 0; j < width; j++)
                    GroundLayer[i][j] = new Random().Next(tileVariations);
            }

            EntityLayer = new IEntity[height][];
            for (int i = 0; i < height; i++)
                EntityLayer[i] = new IEntity[width];

            if (lobby.Player1 != null)
            {
                var playerId = lobby.Player1.PlayerId;
                Snakes[playerId] = new Snake(playerId, 1, Lobby.GameSettings.Height, Lobby.GameSettings.Width, this);
                DirectionCommand[playerId] = 'r';
            }
            if (lobby.Player2 != null)
            {
                var playerId = lobby.Player2.PlayerId;
                Snakes[playerId] = new Snake(playerId, 2, Lobby.GameSettings.Height, Lobby.GameSettings.Width, this);
                DirectionCommand[playerId] = 'l';
            }

            foreach (var sn in Snakes)
                AddSnakeToEntityLayer(sn.Value);

            SpawnApple();

            Player1Score = 0;
            Player2Score = 0;
            GameTick = 0;
        }

        private PlayerSimplified? GetPlayerSimplifiedByPlayerId(string playerId)
        {
            if (Lobby.Player1 != null && Lobby.Player1.PlayerId == playerId)
                return Lobby.Player1;
            if (Lobby.Player2 != null && Lobby.Player2.PlayerId == playerId)
                return Lobby.Player2;
            return null;
        }

        private bool IsPlayer1(string playerId)
        {
            return Lobby.Player1 != null && Lobby.Player1.PlayerId == playerId;
        }

        public void UseAbility(string playerId)
        {
            if (GState != GameState.InProgress)
                return;
            var player = GetPlayerSimplifiedByPlayerId(playerId);
            if (player == null)
                return;
            Console.WriteLine("Use Ability " + player.Ability + " from " + player.Username + " cd: " + (IsPlayer1(playerId) ? Player1Cooldown : Player2Cooldown));
            if ((IsPlayer1(playerId) && Player1Cooldown > 0) || Player2Cooldown > 0)
                return;

            switch (player.Ability)
            {
                //Swap
                case 0:
                    Snakes[player.PlayerId].Swap(playerId);
                    if (IsPlayer1(playerId))
                        Player1Cooldown = SWAP_COOLDOWN;
                    else
                        Player2Cooldown = SWAP_COOLDOWN;
                    break;
                //Freeze
                case 1:
                    foreach (var snake in Snakes)
                        if (snake.Value.PlayerId != playerId)
                            snake.Value.Freeze();
                    if (IsPlayer1(playerId))
                        Player1Cooldown = FREEZE_COOLDOWN;
                    else
                        Player2Cooldown = FREEZE_COOLDOWN;
                    break;
                //Ghost
                case 2: break;
                default: return;
            }
        }

        public void WantsRematch(string playerId)
        {
            if (Lobby.Player1 != null && Lobby.Player1.PlayerId == playerId)
                Player1WantsRematch = !Player1WantsRematch;
            if (Lobby.Player2 != null && Lobby.Player2.PlayerId == playerId)
                Player2WantsRematch = !Player2WantsRematch;
        }

        public async Task StartGameLoop(Func<Game, Task> onTick)
        {
            Console.WriteLine("Start Game Loop");
            Time = 3000;
            while (Time > 0)
            {
                await Task.Delay(1000);
                if (GState == GameState.Finished)
                    break;
                Time -= 1000;
                Console.WriteLine("1 second passed: " + Time);
                try
                {
                    await onTick(this);
                }
                catch
                {
                    Console.WriteLine("Something went wrong");
                }
            }
            if (GState == GameState.Waiting)
                GState = GameState.InProgress;
            while (GState == GameState.InProgress)
            {
                await Task.Delay(TickInterval);
                Player1Cooldown -= TickInterval;
                Player2Cooldown -= TickInterval;
                Console.WriteLine("\nCD: " + Player1Cooldown + "\n");
                UpdateGameState();
                await onTick(this);
            }
            Console.WriteLine("Game has ended");
        }

        public void SpawnApple()
        {
            Random random = new();
            int rows = EntityLayer.Length;
            int columns = EntityLayer[0].Length;

            int randomRow, randomColumn;
            do
            {
                randomRow = random.Next(0, rows);
                randomColumn = random.Next(0, columns);
            }
            while (EntityLayer[randomRow][randomColumn] != null);

            var newApple = new Apple(randomColumn, randomRow);
            EntityLayer[randomRow][randomColumn] = newApple;
            CurApple = newApple;
        }

        public void MoveSnake(Snake snake)
        {
            if (snake.HasSwapped)
            {
                snake.HasSwapped = false;
                return;
            }
            else if (snake.FrozenMoves > 0)
            {
                snake.FrozenMoves--;
                return;
            }
            char currentDirection = DirectionCommand[snake.PlayerId];
            if (GetOppositeDirection(currentDirection.ToString()) == snake.Head.Direction)
            {
                Console.WriteLine("Prevented self collision bug");
                currentDirection = snake.Head.Direction[0];
            }

            int prevHeadX = snake.Head.X;
            int prevHeadY = snake.Head.Y;
            string afterHeadSegmentDirection = "";
            var gameSettings = Lobby.GameSettings;
            if (gameSettings == null)
            {
                Console.WriteLine("Game Settings is null");
                return;
            }

            switch (currentDirection)
            {
                case 'l':
                    snake.Head.X -= 1;
                    if (snake.Head.X < 0)
                    {
                        if (gameSettings.Borders)
                        {
                            snake.HasCollided = true;
                            return;
                        }
                        else
                        {
                            snake.Head.X = gameSettings.Width - 1;
                        }
                    }
                    if (snake.Head.Direction == "u")
                        afterHeadSegmentDirection = "ld";
                    else if (snake.Head.Direction == "d")
                        afterHeadSegmentDirection = "lu";
                    else
                        afterHeadSegmentDirection = "h";
                    snake.Head.Direction = "l";
                    break;
                case 'r':
                    snake.Head.X += 1;
                    if (snake.Head.X > gameSettings.Width - 1)
                    {
                        if (gameSettings.Borders)
                        {
                            snake.HasCollided = true;
                            return;
                        }
                        else
                        {
                            snake.Head.X = 0;
                        }
                    }
                    if (snake.Head.Direction == "u")
                        afterHeadSegmentDirection = "rd";
                    else if (snake.Head.Direction == "d")
                        afterHeadSegmentDirection = "ru";
                    else
                        afterHeadSegmentDirection = "h";
                    snake.Head.Direction = "r";
                    break;
                case 'u':
                    snake.Head.Y -= 1;
                    if (snake.Head.Y < 0)
                    {
                        if (gameSettings.Borders)
                        {
                            snake.HasCollided = true;
                            return;
                        }
                        else
                        {
                            snake.Head.Y = gameSettings.Height - 1;
                        }
                    }
                    if (snake.Head.Direction == "l")
                        afterHeadSegmentDirection = "ru";
                    else if (snake.Head.Direction == "r")
                        afterHeadSegmentDirection = "lu";
                    else
                        afterHeadSegmentDirection = "v";
                    snake.Head.Direction = "u";
                    break;
                case 'd':
                    snake.Head.Y += 1;
                    if (snake.Head.Y > gameSettings.Height - 1)
                    {
                        if (gameSettings.Borders)
                        {
                            snake.HasCollided = true;
                            return;
                        }
                        else
                        {
                            snake.Head.Y = 0;
                        }
                    }
                    if (snake.Head.Direction == "l")
                        afterHeadSegmentDirection = "rd";
                    else if (snake.Head.Direction == "r")
                        afterHeadSegmentDirection = "ld";
                    else
                        afterHeadSegmentDirection = "v";
                    snake.Head.Direction = "d";
                    break;
            }

            if (EntityLayer[snake.Head.Y][snake.Head.X] is Apple)
            {
                SnakeSegment newSegment = new(prevHeadX, prevHeadY, afterHeadSegmentDirection, "body", snake.PlayerNumber);
                snake.Segments.AddFirst(newSegment);
                if (snake.PlayerNumber == 1)
                    Player1Score += 100;
                else
                    Player2Score += 100;
                SpawnApple();
            }
            else
            {
                var lastSegment = snake.Segments.Last?.Value;
                if (lastSegment == null)
                    return;

                int prevLastSegmentX = lastSegment.X;
                int prevLastSegmentY = lastSegment.Y;
                string prevLastSegmentDirection = lastSegment.Direction;

                lastSegment.X = prevHeadX;
                lastSegment.Y = prevHeadY;
                lastSegment.Direction = afterHeadSegmentDirection;

                snake.Segments.RemoveLast();
                snake.Segments.AddFirst(lastSegment);

                // If apple, keep tail equal
                // Else update new tail position to be the previous last segment.
                snake.Tail.X = prevLastSegmentX;
                snake.Tail.Y = prevLastSegmentY;

                if ((prevLastSegmentDirection == "ru" || prevLastSegmentDirection == "lu") && (snake.Tail.Direction == "l" || snake.Tail.Direction == "r"))
                {
                    snake.Tail.Direction = "u";
                }
                else if (prevLastSegmentDirection == "ru" && snake.Tail.Direction == "d")
                {
                    snake.Tail.Direction = "r";
                }
                else if (prevLastSegmentDirection == "lu" && snake.Tail.Direction == "d")
                {
                    snake.Tail.Direction = "l";
                }

                else if ((prevLastSegmentDirection == "rd" || prevLastSegmentDirection == "ld") && (snake.Tail.Direction == "l" || snake.Tail.Direction == "r"))
                {
                    snake.Tail.Direction = "d";
                }
                else if (prevLastSegmentDirection == "rd" && snake.Tail.Direction == "u")
                {
                    snake.Tail.Direction = "r";
                }
                else if (prevLastSegmentDirection == "ld" && snake.Tail.Direction == "u")
                {
                    snake.Tail.Direction = "l";
                }
            }
        }

        private void AddSnakeToEntityLayer(Snake snake)
        {
            Console.WriteLine("Add Snake to Entity Layer");
            EntityLayer[snake.Head.Y][snake.Head.X] = snake.Head;
            foreach (IEntity segment in snake.Segments)
                EntityLayer[segment.Y][segment.X] = segment;
            EntityLayer[snake.Tail.Y][snake.Tail.X] = snake.Tail;
        }

        public void ReceiveDirectionCommand(string playerId, char command)
        {
            if (GState == GameState.Finished)
                return;
            //var curDirection = DirectionCommand[playerId];
            char curDirection = Snakes[playerId].Head.Direction[0];

            if ((curDirection == 'l' && command == 'r') ||
                (curDirection == 'r' && command == 'l') ||
                (curDirection == 'u' && command == 'd') ||
                (curDirection == 'd' && command == 'u'))
                return;
            DirectionCommand[playerId] = command;
        }

        public void HandleDisconnection(string playerId)
        {
            if (GState == GameState.Finished)
                return;
            if (Lobby.Player1 != null && Lobby.Player1.PlayerId == playerId)
                EndGame(FinishedState.Player1Disconnected);
            else if (Lobby.Player2 != null && Lobby.Player2.PlayerId == playerId)
                EndGame(FinishedState.Player2Disconnected);
            else
                Console.WriteLine("[ERROR] Lobby.Player is null or wrong playerId");
        }

        private void EndGame(FinishedState newState)
        {
            Console.WriteLine("End Game on State: " + newState.ToString());
            GState = GameState.Finished;
            FState = newState;

            if (IsSinglePlayer)
                return;

            var player1 = Lobby.Player1!;
            var player2 = Lobby.Player2!;

            switch (newState)
            {
                case FinishedState.Player1Disconnected:
                    player1.Losses++;
                    player2.Wins++;
                    break;

                case FinishedState.Player2Disconnected:
                    player1.Wins++;
                    player2.Losses++;
                    break;

                case FinishedState.Player1WonByTimeOut:
                case FinishedState.Player1WonByCollision:
                    player1.Wins++;
                    player2.Losses++;
                    break;

                case FinishedState.Player2WonByTimeOut:
                case FinishedState.Player2WonByCollision:
                    player1.Losses++;
                    player2.Wins++;
                    break;
            }
        }

        public Snake? GetPlayerSnake(int playerNumber)
        {
            Snake? player1Snake = null, player2Snake = null;

            if (Lobby.Player1 != null)
                player1Snake = Snakes.Values.FirstOrDefault(s => s.PlayerId == Lobby.Player1.PlayerId);

            if (Lobby.Player2 != null)
                player2Snake = Snakes.Values.FirstOrDefault(s => s.PlayerId == Lobby.Player2.PlayerId);

            return playerNumber == 1 ? player1Snake : player2Snake;
        }

        private void EndGameIfCollisionDetected()
        {
            if (IsSinglePlayer || Lobby.Player1 == null || Lobby.Player2 == null || Snakes.Count != 2)
                return;

            var snake1 = Snakes.First().Value;
            var snake2 = Snakes.Last().Value;

            /* End Game if at least 1 player lost */
            if (snake1.HasCollided && snake2.HasCollided)
                EndGame(FinishedState.DrawByCollision);
            else if (snake1.HasCollided)
                EndGame(FinishedState.Player2WonByCollision);
            else if (snake2.HasCollided)
                EndGame(FinishedState.Player1WonByCollision);
        }

        public void UpdateGameState()
        {
            Time += TickInterval;
            GameTick++;
            if (Time >= Lobby.GameSettings!.Time * 1000)
            {
                if (IsSinglePlayer)
                    EndGame(FinishedState.SinglePlayerTimeOut);
                else if (Player1Score > Player2Score)
                    EndGame(FinishedState.Player1WonByTimeOut);
                else if (Player1Score < Player2Score)
                    EndGame(FinishedState.Player2WonByTimeOut);
                else
                    EndGame(FinishedState.DrawByTimeOut);
            }

            foreach (var sn in Snakes)
                MoveSnake(sn.Value);

            DetectSinglePlayerCollisions();
            DetectMultiPlayerCollisions();
            EndGameIfCollisionDetected();

            if (GState == GameState.Finished)
            {
                Console.WriteLine("Game Ended in collision");
                return;
            }

            UpdateEntityLayer();
        }

        private void UpdateEntityLayer()
        {
            Console.WriteLine("Update Entity Layer");
            if (EntityLayer == null || EntityLayer[0] == null)
                return;

            for (int i = 0; i < EntityLayer.Length; i++)
                for (int j = 0; j < EntityLayer[i].Length; j++)
                    EntityLayer[i][j] = null;

            foreach (var sn in Snakes)
                AddSnakeToEntityLayer(sn.Value);
            if (CurApple != null)
                EntityLayer[CurApple.Y][CurApple.X] = CurApple;
        }

        private void DetectSinglePlayerCollisions()
        {
            if (!IsSinglePlayer)
                return;

            Snake snake = Snakes.Values.First();
            if (snake.HasCollided)
            {
                EndGame(FinishedState.SinglePlayerCollision);
                return;
            }

            foreach (var segment in snake.Segments)
            {
                if (snake.Head.X == segment.X && snake.Head.Y == segment.Y)
                {
                    snake.HasCollided = true;
                    break;
                }
            }
            if (snake.Head.X == snake.Tail.X && snake.Head.Y == snake.Tail.Y)
                snake.HasCollided = true;

            if (snake.HasCollided)
                EndGame(FinishedState.SinglePlayerCollision);
        }

        private void DetectMultiPlayerCollisions()
        {
            if (IsSinglePlayer)
                return;

            foreach (var snakeHeadEntry in Snakes)
            {
                /* If border collision has been marked previously on MoveSnake() */
                if (snakeHeadEntry.Value.HasCollided)
                    continue;

                var snakeHead = snakeHeadEntry.Value.Head;
                foreach (var snakeBodyEntry in Snakes)
                {
                    var snakeBody = snakeBodyEntry.Value.Segments;
                    foreach (var segment in snakeBody)
                        if (snakeHead.X == segment.X && snakeHead.Y == segment.Y)
                        {
                            snakeHeadEntry.Value.HasCollided = true;
                            break;
                        }
                    var snakeTail = snakeBodyEntry.Value.Tail;
                    if (snakeHead.X == snakeTail.X && snakeHead.Y == snakeTail.Y)
                        snakeHeadEntry.Value.HasCollided = true;
                }
            }

            /* Heads Collision */
            if (Snakes.Count != 2)
                return;

            var snake1 = Snakes.First().Value;
            var snake2 = Snakes.Last().Value;
            if (snake1.Head.X == snake2.Head.X && snake1.Head.Y == snake2.Head.Y)
            {
                snake1.HasCollided = true;
                snake2.HasCollided = true;
            }
        }

        public GameData ToResponseDto()
        {
            var newData = new GameData(this);
            EntityLayerDataCopy = newData.EntityLayer;
            return newData;
        }

        public class GameData
        {
            public string GameId { get; private set; } = string.Empty;
            public PrivateLobbyResponseDto Lobby { get; private set; }

            public int[][] GroundLayer { get; private set; }
            public string[][] EntityLayer { get; private set; }

            public int Player1Score { get; private set; } = 0;
            public int Player2Score { get; private set; } = 0;
            public int Player1Cooldown { get; private set; } = 0;
            public int Player2Cooldown { get; private set; } = 0;
            public bool Player1Frozen { get; private set; } = false;
            public bool Player2Frozen { get; private set; } = false;
            public int GameTick { get; private set; } = 0;
            public int Time { get; private set; } = 3;

            public bool IsSinglePlayer { get; private set; }

            public string FinishedState { get; private set; } = Game.FinishedState.NotFinished.ToString();

            public GameData(Game game)
            {
                GameId = game.GameId;
                Lobby = LobbyMappers.ToResponseDto((PrivateLobby)game.Lobby); // Change this when making Public option
                GroundLayer = game.GroundLayer;
                EntityLayer = game.GState == GameState.Finished ? game.EntityLayerDataCopy : EntityLayerToData(game.EntityLayer);
                Player1Score = game.Player1Score;
                Player2Score = game.Player2Score;
                Player1Cooldown = (int)Math.Ceiling(game.Player1Cooldown / 1000.0);
                Player2Cooldown = (int)Math.Ceiling(game.Player2Cooldown / 1000.0);
                var snake1 = game.GetPlayerSnake(1);
                var snake2 = game.GetPlayerSnake(2);
                Player1Frozen = snake1 != null && snake1.FrozenMoves > 0;
                Player2Frozen = snake2 != null && snake2.FrozenMoves > 0;
                GameTick = game.GameTick;
                Time = game.Time / 1000;
                FinishedState = game.FState.ToString();
                IsSinglePlayer = game.IsSinglePlayer;
            }

            private static string[][] EntityLayerToData(IEntity?[][] layer)
            {
                int height = layer.Length;
                int width = layer[0].Length;

                string[][] dataLayer = new string[height][];

                for (int i = 0; i < height; i++)
                {
                    dataLayer[i] = new string[width];
                    for (int j = 0; j < width; j++)
                    {
                        if (layer[i][j] != null)
                            dataLayer[i][j] = layer[i][j]!.ToData();
                        else
                            dataLayer[i][j] = "empty";
                    }
                }
                return dataLayer;
            }
        }
    }
}