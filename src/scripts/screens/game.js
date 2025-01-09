import { GAME_LEVEL_CHARACTERS, GAME_LEVELS_COPY } from '../const';

export class GameScreen {
  constructor(level) {
    this.level = level;

    this.round = 1;
  }

  getLevelIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'text-lg font-semibold';
    indicator.textContent = `Level: ${GAME_LEVELS_COPY[this.level]}`;

    return indicator;
  }

  getRoundCounter() {
    const counter = document.createElement('div');
    counter.className = 'text-xl font-bold';
    counter.textContent = `Round: ${this.round}`;

    return counter;
  }

  getSequenceContainer() {
    const container = document.createElement('div');
    container.className =
      'text-2xl font-semibold text-center mb-4 p-2 border-2 border-gray-300 rounded-lg w-64';
    container.textContent = '';

    return container;
  }

  getUserInput() {
    const input = document.createElement('input');
    input.className =
      'text-xl text-center p-2 border-2 border-gray-300 rounded-lg w-64';
    input.disabled = true;

    return input;
  }

  getVirtualKeyboard(level) {
    const keys = GAME_LEVEL_CHARACTERS[level].split('');

    const container = document.createElement('div');
    container.className = 'flex flex-wrap gap-2 justify-center';

    keys.forEach((key) => {
      const button = document.createElement('button');
      button.textContent = key;
      button.className = 'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300';
      button.dataset.key = key;

      container.appendChild(button);
    });

    return container;
  }

  getRepeatButton() {
    const button = document.createElement('button');
    button.textContent = 'Repeat the Sequence';
    button.className = 'px-6 py-2 bg-yellow-500 text-white rounded-lg mt-4';
    button.disabled = true;

    return button;
  }

  getNewGameButton() {
    const button = document.createElement('button');
    button.textContent = 'New Game';
    button.className = 'px-6 py-2 bg-green-500 text-white rounded-lg mt-4';

    return button;
  }

  render() {
    const container = document.createElement('div');
    container.className =
      'flex flex-col items-center justify-center min-h-screen p-6';

    const levelIndicator = this.getLevelIndicator();
    const roundCounter = this.getRoundCounter();
    const sequenceContainer = this.getSequenceContainer();
    const userInput = this.getUserInput();
    const virtualKeyboard = this.getVirtualKeyboard(this.level);
    const repeatButton = this.getRepeatButton();
    const newGameButton = this.getNewGameButton();

    container.appendChild(levelIndicator);
    container.appendChild(roundCounter);
    container.appendChild(sequenceContainer);
    container.appendChild(userInput);
    container.appendChild(virtualKeyboard);
    container.appendChild(repeatButton);
    container.appendChild(newGameButton);

    return container;
  }
}
