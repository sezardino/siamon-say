import { GAME_LEVEL_CHARACTERS } from '../../const/level';

export const GAME_SCREEN_IDS = {
  KEYBOARD: 'virtual-keyboard',
  SEQUENCE_DISPLAY: 'sequence-display',
  USER_INPUT: 'user-input',
  SCREEN: 'game-screen',
};

/**
 * Creates the virtual keyboard based on the selected level.
 *
 * @param {string} level - Selected difficulty level.
 * @returns {HTMLElement} - The virtual keyboard element.
 */
const createVirtualKeyboard = (level) => {
  const characters = GAME_LEVEL_CHARACTERS[level.toUpperCase()];
  const keyboardContainer = document.createElement('div');
  keyboardContainer.id = GAME_SCREEN_IDS.KEYBOARD;
  keyboardContainer.className = 'mt-6'; // Tailwind classes for layout

  // Create an unordered list for the keyboard buttons
  const keyboardList = document.createElement('ul');
  keyboardList.className = 'flex flex-wrap items-center gap-4'; // Tailwind classes for list layout

  // Create a list item for each character
  characters.split('').forEach((char) => {
    const li = document.createElement('li');
    li.className = 'w-12 h-12 flex justify-center items-center';

    const button = document.createElement('button');
    button.textContent = char;
    button.className =
      'w-full h-full text-xl bg-gray-200 border border-gray-300 rounded hover:bg-gray-300 transition-all';

    li.appendChild(button);
    keyboardList.appendChild(li);
  });

  keyboardContainer.appendChild(keyboardList);

  return keyboardContainer;
};

/**
 * Creates the input fields and sequence display elements.
 *
 * @returns {Object} - Elements for the game screen (sequenceDisplay, userInput).
 */
const createInputFields = () => {
  // Sequence display
  const sequenceDisplay = document.createElement('div');
  sequenceDisplay.id = GAME_SCREEN_IDS.SEQUENCE_DISPLAY;
  sequenceDisplay.className =
    'w-full text-3xl text-center p-4 bg-gray-100 border border-gray-300 rounded mt-6';

  // User input display
  const userInput = document.createElement('input');
  userInput.id = GAME_SCREEN_IDS.USER_INPUT;
  userInput.className =
    'w-full text-3xl text-center p-4 bg-gray-100 border border-gray-300 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500';
  userInput.setAttribute('readonly', 'true');

  return { sequenceDisplay, userInput };
};

/**
 * Creates the game screen.
 *
 * @param {string} level - Selected difficulty level.
 * @returns {HTMLElement} - The full game screen UI element.
 */
const createGameScreen = (level) => {
  const screen = document.createElement('div');
  screen.id = GAME_SCREEN_IDS.SCREEN;
  screen.className = 'container flex flex-col items-center py-8';

  // Create and append virtual keyboard
  const keyboard = createVirtualKeyboard(level);
  screen.appendChild(keyboard);

  // Create and append input fields
  const { sequenceDisplay, userInput } = createInputFields();
  screen.appendChild(sequenceDisplay);
  screen.appendChild(userInput);

  return screen;
};

export { createGameScreen };
