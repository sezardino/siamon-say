// @ts-nocheck
import { GAME_LEVEL_CHARACTERS, GAME_LEVELS_COPY } from '../const';

export class GameScreen {
  constructor(onValidateUserInput) {
    this.onValidateUserInput = onValidateUserInput;

    this.isKeyPressed = false;
    this.isPreventInput = false;
    this.userInput = '';

    this.stopGame = this.stopGame.bind(this);
    this.handleRetrySequence = this.handleRetrySequence.bind(this);
  }

  resetScreen() {
    this.isKeyPressed = false;
    this.isPreventInput = false;
    this.updateSequenceInput('');
  }

  getLevelIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'text-lg font-semibold';
    indicator.textContent = `Level: ${GAME_LEVELS_COPY[this.level]}`;

    return indicator;
  }

  getRoundCounter(round = 1) {
    const counter = document.createElement('div');
    counter.className = 'text-xl font-bold';
    counter.textContent = `Round: ${round}`;

    return counter;
  }

  getSequenceContainer() {
    const container = document.createElement('div');
    container.className =
      'text-2xl font-semibold text-center mb-4 p-2 border-2 border-gray-300 rounded-lg w-64 uppercase';
    container.textContent = '';

    return container;
  }

  getSequenceInput() {
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
      button.className =
        'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 uppercase';
      button.dataset.key = key;

      container.appendChild(button);
    });

    container.addEventListener('click', (evt) => {
      const target = evt.target;

      const key = target.dataset.key;

      if (!key) return;

      this.userInputHandler(key);
    });

    return container;
  }

  stopGame(hasExtraLive) {
    this.isPreventInput = true;

    if (hasExtraLive) this.repeatButton.disabled = false;
  }

  getRepeatButton() {
    const button = document.createElement('button');
    button.textContent = 'Repeat the Sequence';
    button.className =
      'px-6 py-2 bg-yellow-500 text-white rounded-lg mt-4 disabled:bg-opacity-40';
    button.disabled = true;

    button.addEventListener('click', this.handleRetrySequence);

    return button;
  }

  handleRetrySequence() {
    this.updateSequenceInput('');
    this.repeatButton.disabled = true;
    this.isPreventInput = false;
  }

  getNewGameButton(onNewGameClick) {
    const button = document.createElement('button');
    button.textContent = 'New Game';
    button.className = 'px-6 py-2 bg-green-500 text-white rounded-lg mt-4';
    button.addEventListener('click', onNewGameClick);

    return button;
  }

  updateSequenceInput(input) {
    if (!this.sequenceInput) return;

    this.sequenceInput.value = input;
    this.userInput = input;
  }

  startNewRound(sequence, round) {
    if (!this.sequenceContainer || !this.roundCounter || !this.repeatButton)
      return;

    this.sequenceContainer.textContent = sequence;

    this.isPreventInput = false;

    this.updateSequenceInput('');

    this.roundCounter.textContent = `Round: ${round}`;
  }

  userInputHandler(key) {
    if (!this.sequenceInput || this.isPreventInput) return;

    const validKeys = GAME_LEVEL_CHARACTERS[this.level];

    if (!validKeys.includes(key)) return;

    const newValue = this.userInput + key;

    this.updateSequenceInput(newValue);
    console.log(newValue);
    this.onValidateUserInput(newValue);
  }

  addEventListeners() {
    document.addEventListener('keydown', (evt) => {
      if (this.isKeyPressed) return;
      this.isKeyPressed = true;

      const key = evt.key.toLowerCase();

      this.userInputHandler(key);

      setTimeout(() => {
        this.isKeyPressed = false;
      }, 100);
    });
  }

  render(onNewGameClick, level) {
    this.level = level;
    const container = document.createElement('div');
    container.className =
      'flex flex-col items-center justify-center min-h-screen p-6';

    const levelIndicator = this.getLevelIndicator();
    this.roundCounter = this.getRoundCounter();
    this.sequenceContainer = this.getSequenceContainer();
    this.sequenceInput = this.getSequenceInput();
    const virtualKeyboard = this.getVirtualKeyboard(this.level);
    this.repeatButton = this.getRepeatButton();
    const newGameButton = this.getNewGameButton(onNewGameClick);

    container.appendChild(levelIndicator);
    container.appendChild(this.roundCounter);
    container.appendChild(this.sequenceContainer);
    container.appendChild(this.sequenceInput);
    container.appendChild(virtualKeyboard);
    container.appendChild(this.repeatButton);
    container.appendChild(newGameButton);

    this.addEventListeners();

    return container;
  }
}
