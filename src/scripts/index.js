import { GAME_LEVEL_CHARACTERS } from './const';
import { GameScreen } from './screens/game';
import { IdleScreen } from './screens/idle';
import { ResultScreen } from './screens/results';

const MAX_ROUNDS = 2;

class SimonSays {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);

    if (!this.root) throw new Error('Root not provided');

    this.startGame = this.startGame.bind(this);
    this.init = this.init.bind(this);
    this.validateUserInput = this.validateUserInput.bind(this);

    this.gameScreen = null;

    this.resetGame();
    this.init();
  }

  resetGame() {
    this.currentScreen = null;
    this.level = null;
    this.round = 1;
    this.hasExtraLive = true;
    this.sequence = null;
  }

  generateSequence(level, round) {
    const sequenceLength = round * 2;
    let sequence = '';
    for (let i = 0; i < sequenceLength; i++) {
      const symbols = GAME_LEVEL_CHARACTERS[level].split('');

      const randomKey = symbols[Math.floor(Math.random() * symbols.length)];
      sequence += randomKey;
    }
    return sequence;
  }

  renderScreen(screenElement) {
    if (!this.root) return;

    this.root.innerHTML = '';

    this.root.appendChild(screenElement);
  }

  validateUserInput(input) {
    if (!this.sequence) return;

    if (input === this.sequence) {
      this.handleCorrectInput();
    } else if (!this.sequence.startsWith(input)) {
      this.incorrectInput();
    }
  }

  handleCorrectInput() {
    if (!this.round || !this.gameScreen) return;

    if (this.round >= MAX_ROUNDS) {
      this.finishGame(true);
      return;
    }

    this.round += 1;
    this.sequence = this.generateSequence(this.level, this.round);

    this.gameScreen.startNewRound(this.sequence, this.round);
  }

  incorrectInput() {
    if (!this.gameScreen) return;

    this.gameScreen.stopGame(this.hasExtraLive);
    if (this.hasExtraLive) this.hasExtraLive = false;
    else this.finishGame(false);
  }

  startGame(level) {
    if (!this.root) return;

    this.level = level;
    this.round = 1;
    if (!this.gameScreen) {
      this.gameScreen = new GameScreen(this.validateUserInput);
    }

    this.sequence = this.generateSequence(level, this.round);
    const gameScreenElement = this.gameScreen.render(this.init, this.level);

    this.renderScreen(gameScreenElement);

    this.gameScreen.startNewRound(this.sequence, this.round);
  }

  finishGame(isSuccess) {
    const screen = new ResultScreen(isSuccess, this.round);
    const resultScreenElement = screen.render(
      () => this.startGame(this.level),
      this.init
    );

    this.renderScreen(resultScreenElement);
  }

  init() {
    this.currentScreen = new IdleScreen();
    const idleScreenElement = this.currentScreen.render((level) =>
      this.startGame(level)
    );

    this.renderScreen(idleScreenElement);
  }
}

new SimonSays('#app');
