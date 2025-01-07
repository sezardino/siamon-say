import { GAME_LEVELS } from '../../const/level';

export const START_SCREEN_IDS = {
  CONTAINER: 'start-screen',
  LEVEL_SELECTOR: 'level-selector',
  START_BUTTON: 'start-button',
};

/**
 * Creates the start screen for the Simon Says game.
 *
 * @param {function(string): void} onStartGame - Callback function to start the game. Receives the selected level as a parameter.
 * @returns {HTMLElement} - The start screen element.
 */
export const createStartScreen = (onStartGame) => {
  // Create container
  const container = document.createElement('div');
  container.id = START_SCREEN_IDS.CONTAINER;
  container.className =
    'flex flex-col items-center justify-center min-h-screen bg-gray-100';

  // Create title
  const title = document.createElement('h1');
  title.className = 'text-4xl font-bold text-center mb-8';
  title.textContent = 'Simon Says Game';

  // Create level selector
  const levelSelector = document.createElement('select');
  levelSelector.id = START_SCREEN_IDS.LEVEL_SELECTOR;
  levelSelector.className = 'border border-gray-400 rounded px-4 py-2 mb-6';

  // Populate level selector
  GAME_LEVELS.forEach((level) => {
    const option = document.createElement('option');
    option.value = level;
    option.textContent = level.charAt(0).toUpperCase() + level.slice(1); // Format: 'easy' -> 'Easy'
    levelSelector.appendChild(option);
  });

  // Create start button
  const startButton = document.createElement('button');
  startButton.id = START_SCREEN_IDS.START_BUTTON;
  startButton.className =
    'bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600';
  startButton.textContent = 'Start';

  // Add event listener to start button
  startButton.addEventListener('click', () => {
    const selectedLevel = levelSelector.value;
    onStartGame(selectedLevel);
  });

  // Append elements to container
  container.appendChild(title);
  container.appendChild(levelSelector);
  container.appendChild(startButton);

  return container;
};
