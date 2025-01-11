// @ts-nocheck

import { Button } from '../components/button';
import { Typography } from '../components/typography';
import { GAME_LEVEL_CHARACTERS, GAME_LEVELS_COPY } from '../const/game';
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

  createRoundCounter(round = 1) {
    return new Typography(`Round: ${round}`, 'xl', 'h2').element;
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
      'text-xl text-center p-2 border-2 border-gray-300 rounded-lg w-64 uppercase transition-all duration-300 disabled:opacity-40',
      '',
      { readOnly: true }
    );
  }

  createVirtualKeyboard(level) {
    const keys = GAME_LEVEL_CHARACTERS[level].split('');

    const container = this.createElement(
      'div',
      'mt-4 flex flex-wrap gap-2 justify-center max-w-[800px]'
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
      if (!evt.target) return;

      const key = evt.target.dataset.key;
      if (key) {
        this.userInputHandler(key);
        this.addKeyAnimation(evt.target);
      }
    });

    return container;
  }

  addKeyAnimation(button) {
    this.addTempClasses(button, ['animate-tada'], 1000);
    this.addTempClasses(button, ['bg-blue-500', 'text-white'], 200);
  }

  resetScreen() {
    this.isKeyPressed = false;
    this.isPreventInput = false;
    this.updateSequenceInput('');
  }

  startNewRound(sequence, round) {
    if (!this.sequenceContainer || !this.roundCounter) return;

    // Disable input during sequence display
    this.isPreventInput = true;
    this.sequenceInput.disabled = true;
    this.updateSequenceInput('');
    this.roundCounter.textContent = `Round: ${round}`;
    this.sequenceInput.classList.remove('bg-yellow-100');

    // for debug and cross-check purposes
    console.log(`Round ${round}, current sequence: ${sequence}`);

    const wrapper = this.createElement(
      'div',
      'transition-opacity duration-1000 ease-in-out'
    );

    this.sequenceContainer.innerHTML = '';

    const characters = sequence.split('');

    characters.forEach((char, index) => {
      const charElement = new Typography(
        char,
        'xl',
        'span',
        'inline-block opacity-0 transition-opacity duration-300 ease-in-out'
      ).element;

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

      // Enable input after sequence display
      this.isPreventInput = false;
      this.sequenceInput.disabled = false;
      this.sequenceInput.classList.add('bg-yellow-100');
    }, characters.length * 400); // Ensure enough time before enabling input
  }

  userInputHandler(key) {
    if (this.isPreventInput || !this.sequenceInput) return; // Prevent input if disabled

    const validCharacters = GAME_LEVEL_CHARACTERS[this.level];

    if (!validCharacters.includes(key)) return;

    const newValue = this.userInput + key;
    this.updateSequenceInput(newValue);
    this.onValidateUserInput(newValue);
  }

  stopGame(hasExtraLive) {
    if (!this.repeatButton || !this.sequenceInput) return;

    this.isPreventInput = true;
    if (hasExtraLive) {
      this.repeatButton.disabled = false;
      this.repeatButton.classList.add('animate-tada');
      this.sequenceInput.classList.add('bg-red-100', 'border-red-500');
    }
  }

  handleRetrySequence() {
    if (!this.repeatButton || !this.sequenceInput) return;

    this.updateSequenceInput('');
    this.repeatButton.disabled = true;
    this.sequenceInput.classList.remove('bg-red-100', 'border-red-500');
    this.repeatButton.classList.remove('animate-tada');
    this.isPreventInput = false;
  }

  updateSequenceInput(input) {
    if (!this.sequenceInput) return;

    this.sequenceInput.classList.add('transition-all', 'duration-300');

    this.sequenceInput.style.transform = 'scale(1.1)';
    setTimeout(() => {
      if (!this.sequenceInput) return;

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
      if (button) this.addKeyAnimation(button);

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

    this.roundCounter = this.createRoundCounter();

    this.sequenceContainer = this.createSequenceContainer();

    this.sequenceInput = this.createSequenceInput();

    const buttonsContainer = this.createElement(
      'div',
      'mt-4 flex flex-wrap gap-2 items-center'
    );

    this.repeatButton = new Button(
      'Repeat the Sequence',
      'yellow',
      this.handleRetrySequence,
      { disabled: true }
    ).element;

    buttonsContainer.appendChild(this.repeatButton);
    buttonsContainer.appendChild(
      new Button('New Game', 'green', onNewGameClick).element
    );

    container.appendChild(
      new Typography(
        `Level: ${GAME_LEVELS_COPY[this.level]}`,
        'lg',
        'p',
        'font-semibold'
      ).element
    );
    container.appendChild(this.roundCounter);
    container.appendChild(this.sequenceContainer);
    container.appendChild(this.sequenceInput);

    container.appendChild(this.createVirtualKeyboard(this.level));
    container.appendChild(buttonsContainer);

    this.addEventListeners();

    return container;
  }
}
