import { createStartScreen } from './scripts/screens/start';
import './styles/index.css';

const appContainer = document.getElementById('app');

if (!appContainer) throw new Error('Container not provided');

// TODO: add separate module for game logic
function startGame(level) {
  console.log(`Game started with level: ${level}`);
}

const startScreen = createStartScreen(startGame);
appContainer.appendChild(startScreen);
