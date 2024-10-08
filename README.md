# 🐍 Snake 1v1 Game [In Development]

## 📖 Description

Snake 1v1 is a competitive multiplayer version of the classic snake game, where two players face off in real-time.

Navigate your snake, collect items, unleash special abilities, and avoid collisions to outwit your opponent and claim victory!

## 🌐 Live Version Available
The game is now live and ready to play online! You can challenge your friends in real-time by visiting the following link:

[Play Snake 1v1](https://heldergomesramos.github.io/Snake-1v1)

A copy of the API, which has been migrated from SQL Server to MySQL due to Azure's free subscription tier limitations, is now deployed to Azure. This ensures that the backend of the game is fully operational and accessible, supporting real-time multiplayer gameplay.

API Backend Repository: [Snake 1v1 API](https://github.com/heldergomesramos/Snake-1v1-api-mysql)

## 📸 Screenshots

| ![Gameplay Screenshot 1](/screenshots/Snake-1v1-Screenshot.png) | ![Gameplay Screenshot 2](/screenshots/Snake-1v1-Screenshot-cpl.png) | ![Menu Screenshot](/screenshots/Snake-1v1-Screenshot-game.png) |
| :-------------------------------------------------------------: | :-----------------------------------------------------------------: | :------------------------------------------------------------: |

## ✨ Features

- 🕹 Multiplayer gameplay: Challenge a friend in real-time.
- ⚡ Real-time interactions: Powered by SignalR for seamless communication.
- 🎮 Customizable settings: Adjust game parameters like speed, time limit, board size, abilities and borders.
- 🗺 Multiple maps: Choose from different map layouts for a unique experience every match.
- 🎨 Pixel art graphics: Retro aesthetics inspired by classic snake games.

## 🛠 Technologies Used

- **Frontend**: React
- **Backend**: ASP.NET Core
- **Database**: SQL Server
- **Real-time Communication**: SignalR
- **Data Access**: Entity Framework Core (with SQL Server)

## 🎨 Art & 🎶 Audio

- **Art**: All the pixel art for this project was created by me using Aseprite.
- **Music**: The music played during the game was composed by me using FL Studio.
- **Sound Effects**: I used a mix of free retro video game sample packs and a few custom sounds I designed myself.

## 🚀 How to Run the Game Locally

### Prerequisites

- Ensure you have the [Node.js](https://nodejs.org/) and [.NET SDK](https://dotnet.microsoft.com/download) installed.

### Frontend

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/heldergomesramos/Snake-1v1.git
   ```

2. **Navigate to the Frontend directory and install dependencies**:

```bash
   cd Snake-1v1/Frontend/retro-game
   npm install
```

3. **Start the frontend**:

```bash
   npm run dev
```

### Backend

1. **Navigate to the API Directory**:

```bash
cd Snake-1v1/api
```

2. **Restore Dependencies**: Ensure all required NuGet packages are installed:

```bash
dotnet restore
```

3. **Set Up the Database**:

- Ensure you have SQL Server installed and running locally or have access to a remote SQL Server instance.
- Configure your database connection string in appsettings.json. Don't forget to replace `your_server` and `your_database` with the correct values:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=your_server;Database=your_database;Trusted_Connection=True;"
}
```

- Run any Entity Framework Core migrations to set up the database schema:

```bash
dotnet ef database update
```

4. **Run the Backend**: Start the API:

```bash
dotnet watch run
```

5. **Open in Your Browser**: Navigate to:

```arduino
http://localhost:5173/Snake-1v1
```

## 💡 Contributing

Feel free to use or modify this project as you wish. No need for formal contributions or pull requests.

## 📄 License

This project is licensed under the MIT License.
