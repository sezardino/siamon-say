// @ts-nocheck
import { GAME_LEVEL_CHARACTERS, GAME_LEVELS_COPY } from '../const';
import { AbstractScreen } from './abstract';

export class GameScreen extends AbstractScreen {
  constructor(onValidateUserInput) {
    super();

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

  createLevelIndicator() {
    return this.createElement(
      'div',
      'text-lg font-semibold',
      `Level: ${GAME_LEVELS_COPY[this.level]}`
    );
  }

  createRoundCounter(round = 1) {
    return this.createElement('div', 'text-xl font-bold', `Round: ${round}`);
  }

  createSequenceContainer() {
    return this.createElement(
      'div',
      'text-2xl font-semibold text-center mb-4 p-2 border-2 border-gray-300 rounded-lg w-64 uppercase',
      ''
    );
  }

  createSequenceInput() {
    return this.createElement(
      'input',
      'text-xl text-center p-2 border-2 border-gray-300 rounded-lg w-64',
      '',
      { disabled: true }
    );
  }

  createRepeatButton() {
    const button = this.createElement(
      'button',
      'px-6 py-2 bg-yellow-500 text-white rounded-lg mt-4 disabled:bg-opacity-40',
      'Repeat the Sequence',
      { disabled: true }
    );

    button.addEventListener('click', this.handleRetrySequence);

    return button;
  }

  createNewGameButton(onNewGameClick) {
    const button = this.createElement(
      'button',
      'px-6 py-2 bg-green-500 text-white rounded-lg mt-4',
      'New Game'
    );

    button.addEventListener('click', onNewGameClick);

    return button;
  }

  createVirtualKeyboard(level) {
    const keys = GAME_LEVEL_CHARACTERS[level].split('');

    const container = this.createElement(
      'div',
      'flex flex-wrap gap-2 justify-center'
    );

    keys.forEach((key) => {
      const button = this.createElement(
        'button',
        'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 uppercase',
        key,
        { dataset: { key } }
      );

      container.appendChild(button);
    });

    container.addEventListener('click', (evt) => {
      const key = evt.target.dataset.key;
      if (key) this.userInputHandler(key);
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

    const container = this.createElement(
      'div',
      'flex flex-col items-center justify-center min-h-screen p-6'
    );

    container.appendChild(this.createLevelIndicator());
    this.roundCounter = this.createRoundCounter();
    container.appendChild(this.roundCounter);

    this.sequenceContainer = this.createSequenceContainer();
    container.appendChild(this.sequenceContainer);

    this.sequenceInput = this.createSequenceInput();
    container.appendChild(this.sequenceInput);

    container.appendChild(this.createVirtualKeyboard(this.level));
    this.repeatButton = this.createRepeatButton();
    container.appendChild(this.repeatButton);

    container.appendChild(this.createNewGameButton(onNewGameClick));

    this.addEventListeners();

    return container;
  }
}
