# Cricket Match - Two Player Game 🏏

A real-time, interactive cricket game built with React where two players can compete against each other. This game simulates a cricket match with realistic batting and bowling mechanics, complete with dynamic commentary and live scoring.

## Features

- **Two-Player Gameplay**: Take turns batting and bowling
- **Multiple Game Modes**: Choose from different over limits (1, 5, 10, or 20 overs)
- **Dynamic Commentary**: Real-time match commentary with diverse messages
- **Live Scoreboard**: Track runs, wickets, and run rates
- **Interactive Field**: Visual representation of the cricket field with animations
- **Customizable Teams**: Set custom names for both teams
- **Realistic Mechanics**: 
  - Three batting styles: Defensive, Balanced, and Aggressive
  - Three bowling types: Spin, Medium, and Fast
  - Dynamic probability system for realistic outcomes

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to the local server URL

## How to Play

1. **Setup**:
   - Enter names for both teams
   - Select the number of overs (1, 5, 10, or 20)
   - Click "Start Match"

2. **Gameplay**:
   - Players take turns batting and bowling
   - Batting player chooses between:
     - Defensive (safe, fewer runs)
     - Balanced (mix of safety and runs)
     - Aggressive (high risk, high reward)
   - Bowling player selects:
     - Spin (tricky, creates confusion)
     - Medium (balanced pace)
     - Fast (quick, intimidating)

3. **Winning**:
   - Team with the most runs after both innings wins
   - Match ends when:
     - All overs are completed
     - Team is all out (10 wickets)
     - Second team surpasses first team's score

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Lucide React (for icons)

## Live Demo

Try the game live at: [Cricket Match Game](https://magenta-parfait-dd8cba.netlify.app)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.