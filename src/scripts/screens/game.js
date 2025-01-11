// @ts-nocheck

import { Button } from '../components/button';
import { Typography } from '../components/typography';
import { GAME_LEVEL_CHARACTERS, GAME_LEVELS_COPY } from '../const/game';
import { AbstractScreen } from './abstract';

const CORRECT_SEQUENCE_INPUT_BG = '!bg-green-100';
const CORRECT_SEQUENCE_INPUT_BORDER = '!bg-green-100';
const DEFAULT_SEQUENCE_INPUT_BG = 'bg-yellow-100';
const IN_CORRECT_SEQUENCE_INPUT_BG = 'bg-red-100';
const IN_CORRECT_SEQUENCE_INPUT_BORDER = 'border-red-500';

const KEY_HIGHLIGHT_BG = '!bg-blue-500';
const KEY_HIGHLIGHT_COLOR = 'text-white';
const KEY_FEEDBACK_HIGHLIGHT_BG = '!bg-yellow-500';

const TADA_ANIMATION = 'animate-tada';

export class GameScreen extends AbstractScreen {
  constructor(onValidateUserInput, setExtraLive) {
    super();
    this.onValidateUserInput = onValidateUserInput;
    this.setExtraLive = setExtraLive;
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
    this.addTempClasses(button, [TADA_ANIMATION], 1000);
    this.addTempClasses(
      button,
      [KEY_FEEDBACK_HIGHLIGHT_BG, KEY_HIGHLIGHT_COLOR],
      200
    );
  }

  resetScreen() {
    this.isKeyPressed = false;
    this.isPreventInput = false;
    this.updateSequenceInput('');
  }

  renderSequenceAnimation(sequence, onFinishAnimation) {
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
        this.highlightKey(char);
      }, index * 1000);
    });

    this.sequenceContainer.appendChild(wrapper);

    setTimeout(() => {
      wrapper.classList.remove('opacity-100');
      wrapper.classList.add('opacity-0');

      onFinishAnimation();
    }, sequence.length * 1000);
  }

  prepareForNextRound(onNextRoundClick) {
    this.isPreventInput = true;
    const nextRoundButton = new Button('Next round', 'primary', () => {
      onNextRoundClick();
      nextRoundButton.element.replaceWith(this.repeatButton);
    });

    this.sequenceInput.classList.add(
      CORRECT_SEQUENCE_INPUT_BG,
      CORRECT_SEQUENCE_INPUT_BORDER
    );
    this.provideFeedback(true);
    this.repeatButton.replaceWith(nextRoundButton.element);
  }

  startNewRound(sequence, round, isRepeat = false) {
    if (!this.sequenceContainer || !this.roundCounter) return;

    if (!isRepeat) {
      console.log(`Round ${round}, current sequence: ${sequence}`);
      this.roundCounter.textContent = `Round: ${round}`;
      this.round = round;
    } else {
      this.setExtraLive(false);
    }

    this.removeFeedback();
    this.isPreventInput = true;
    this.sequenceInput.disabled = true;
    this.updateSequenceInput('');
    this.sequenceInput.classList.remove(
      CORRECT_SEQUENCE_INPUT_BG,
      CORRECT_SEQUENCE_INPUT_BORDER
    );
    this.sequenceInput.classList.remove(DEFAULT_SEQUENCE_INPUT_BG);

    this.repeatButton.classList.remove(TADA_ANIMATION);

    this.repeatButton.disabled = true;
    this.newGameButton.disabled = true;

    this.renderSequenceAnimation(sequence, () => {
      this.repeatButton.disabled = isRepeat;
      this.newGameButton.disabled = false;
      this.isPreventInput = false;
      this.sequenceInput.disabled = false;
      this.sequenceInput.classList.add(DEFAULT_SEQUENCE_INPUT_BG);
    });
  }

  highlightKey(key) {
    const button = this.getButtonByKey(key);
    if (!button) return;

    button.classList.add(KEY_HIGHLIGHT_BG, KEY_HIGHLIGHT_COLOR);

    setTimeout(() => {
      button.classList.remove(KEY_HIGHLIGHT_BG, KEY_HIGHLIGHT_COLOR);
    }, 300);
  }

  userInputHandler(key) {
    if (this.isPreventInput || !this.sequenceInput) return;

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
      this.repeatButton.classList.add(TADA_ANIMATION);
      this.sequenceInput.classList.add(
        IN_CORRECT_SEQUENCE_INPUT_BG,
        IN_CORRECT_SEQUENCE_INPUT_BORDER
      );
      this.provideFeedback(false);
    }
  }

  handleRetrySequence() {
    if (!this.repeatButton || !this.sequenceInput) return;

    this.updateSequenceInput('');
    this.repeatButton.disabled = true;
    this.sequenceInput.classList.remove(
      IN_CORRECT_SEQUENCE_INPUT_BG,
      IN_CORRECT_SEQUENCE_INPUT_BORDER
    );
    this.repeatButton.classList.remove(TADA_ANIMATION);
    this.isPreventInput = false;

    this.startNewRound(this.sequenceContainer.textContent, this.round, true);
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

  provideFeedback(isCorrect) {
    const message = isCorrect ? 'Correct sequence' : 'Incorrect sequence';
    const textColor = isCorrect ? 'text-green-500' : 'text-red-500';

    this.feedback = new Typography(
      message,
      'xl',
      'p',
      `${textColor} absolute bottom-40 left-1/2 -translate-x-1/2`
    ).element;

    this.screenRoot.appendChild(this.feedback);
  }

  removeFeedback() {
    if (!this.screenRoot.contains(this.feedback)) return;

    this.screenRoot.removeChild(this.feedback);
  }

  render(onNewGameClick, level) {
    this.level = level;

    const container = this.createElement(
      'div',
      'flex flex-col items-center justify-center min-h-screen p-6'
    );
    this.screenRoot = container;

    this.roundCounter = this.createRoundCounter();

    this.sequenceContainer = this.createSequenceContainer();

    this.sequenceInput = this.createSequenceInput();

    const buttonsContainer = this.createElement(
      'div',
      'mt-4 flex flex-wrap gap-2 items-center justify-center'
    );

    this.repeatButton = new Button(
      'Repeat the Sequence',
      'yellow',
      this.handleRetrySequence,
      { disabled: true }
    ).element;

    this.newGameButton = new Button(
      'New Game',
      'green',
      onNewGameClick
    ).element;

    buttonsContainer.appendChild(this.repeatButton);
    buttonsContainer.appendChild(this.newGameButton);

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
