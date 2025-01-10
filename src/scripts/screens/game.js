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

    this.handleRetrySequence = this.handleRetrySequence.bind(this);
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
      'text-xl text-center p-2 border-2 border-gray-300 rounded-lg w-64 uppercase',
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
      'mt-4 flex flex-wrap gap-2 justify-center'
    );

    keys.forEach((key) => {
      const button = this.createElement(
        'button',
        'px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 uppercase transition-all duration-150',
        key,
        { dataset: { key } }
      );
      container.appendChild(button);
    });

    container.addEventListener('click', (evt) => {
      const key = evt.target.dataset.key;
      if (key) {
        this.userInputHandler(key);
        this.addKeyHighlight(evt.target);
        this.addPulseAnimation(evt.target);
      }
    });

    return container;
  }

  addPulseAnimation(button) {
    button.classList.add('animate-tada');
    setTimeout(() => {
      button.classList.remove('animate-tada');
    }, 1000);
  }

  addKeyHighlight(button) {
    button.classList.add('bg-blue-500', 'text-white');
    setTimeout(() => {
      button.classList.remove('bg-blue-500', 'text-white');
    }, 200);
  }

  resetScreen() {
    this.isKeyPressed = false;
    this.isPreventInput = false;
    this.updateSequenceInput('');
  }

  startNewRound(sequence, round) {
    const wrapper = this.createElement(
      'div',
      'transition-opacity duration-1000 ease-in-out'
    );

    this.sequenceContainer.innerHTML = '';

    const characters = sequence.split('');
    characters.forEach((char, index) => {
      const charElement = this.createElement(
        'span',
        'inline-block opacity-0 transition-opacity duration-300 ease-in-out',
        char
      );
      wrapper.appendChild(charElement);

      charElement.style.animationDelay = `${index * 1000}ms`;

      setTimeout(() => {
        charElement.classList.add('opacity-100');
      }, index * 200);
    });

    this.sequenceContainer.appendChild(wrapper);

    setTimeout(() => {
      wrapper.classList.remove('opacity-100');
      wrapper.classList.add('opacity-0');
    }, 2000);

    this.isPreventInput = false;
    this.updateSequenceInput('');
    this.roundCounter.textContent = `Round: ${round}`;
  }

  userInputHandler(key) {
    if (this.isPreventInput || !this.sequenceInput) return;

    const newValue = this.userInput + key;
    this.updateSequenceInput(newValue);
    this.onValidateUserInput(newValue);
  }

  stopGame(hasExtraLive) {
    this.isPreventInput = true;
    if (hasExtraLive) {
      this.repeatButton.disabled = false;
      this.repeatButton.classList.add('animate-tada');
      this.sequenceInput.classList.add('bg-red-100', 'border-red-500');
    }
  }

  handleRetrySequence() {
    this.updateSequenceInput('');
    this.repeatButton.disabled = true;
    this.sequenceInput.classList.remove('bg-red-100', 'border-red-500');
    this.repeatButton.classList.remove('animate-tada');
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

    this.sequenceInput.classList.add(
      'bg-yellow-100',
      'transition-all',
      'duration-300'
    );

    setTimeout(() => {
      this.sequenceInput.classList.remove('bg-yellow-100');
    }, 300);

    this.sequenceInput.style.transform = 'scale(1.1)';
    setTimeout(() => {
      this.sequenceInput.style.transform = 'scale(1)';
    }, 300);

    this.sequenceInput.value = input;
    this.userInput = input;
  }

  getButtonByKey(key) {
    return Array.from(document.querySelectorAll('button[data-key]')).find(
      (button) => button.dataset.key === key
    );
  }

  addEventListeners() {
    document.addEventListener('keydown', (evt) => {
      if (this.isKeyPressed) return;
      this.isKeyPressed = true;

      const key = evt.key.toLowerCase();

      this.userInputHandler(key);
      const button = this.getButtonByKey(key);
      if (button) {
        this.addKeyHighlight(button);
        this.addPulseAnimation(button);
      }

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
