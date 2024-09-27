# 🐍 Snake 1v1 Game [In Development]

## 📖 Description

Snake 1v1 is a competitive multiplayer version of the classic snake game, where two players face off in real-time.

Navigate your snake, collect items, unleash special abilities, and avoid collisions to outwit your opponent and claim victory!

## 📸 Screenshots

![Gameplay Screenshot 1](/screenshots/Snake-1v1-Screenshot.png)
![Gameplay Screenshot 2](/screenshots/Snake-1v1-Screenshot-cpl.png)
![Menu Screenshot](/screenshots/Snake-1v1-Screenshot-game.png)

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
- **Entity Framework Core**: Data access with SQL Server

## 🚧 Current Status

This project is still **actively in development**, with regular updates being made.

### Features in Development:

- 🗺 **Additional Maps**: Maps 2 and 3 are in the works to expand the variety of play environments.
- 👻 **Ghost Ability**: A new ability that lets players temporarily phase through objects and snakes.
- 📖 **How to Play Guide:** A user-friendly guide to help new players understand game mechanics.
- 🌐 **Backend Deployment & Hosting**: Setting up the backend for live multiplayer action.

## 🚀 How to Run the Game Locally

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
- Configure your database connection string in appsettings.json:

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
