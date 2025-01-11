import { GameState } from './logic/game';
import { GameScreen } from './screens/game';
import { IdleScreen } from './screens/idle';
import { ResultScreen } from './screens/results';

class SimonSays {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);
    if (!this.root) throw new Error('Root not provided');

    this.startGame = this.startGame.bind(this);
    this.init = this.init.bind(this);
    this.validateUserInput = this.validateUserInput.bind(this);

    this.gameState = null;
    this.gameScreen = null;

    this.resetGame();
    this.init();
  }

  resetGame() {
    this.gameState = null;
    this.gameScreen = null;
  }

  startGame(level) {
    if (!this.root) return;

    this.gameState = new GameState(level);
    this.gameState.generateSequence();

    if (!this.gameScreen) {
      this.gameScreen = new GameScreen(
        this.validateUserInput,
        this.gameState.setExtraLive
      );
    }

    const gameScreenElement = this.gameScreen.render(this.init, level);
    this.renderScreen(gameScreenElement);

    this.gameScreen.startNewRound(
      this.gameState.sequence,
      this.gameState.round
    );
  }

  renderScreen(screenElement) {
    if (!this.root) return;
    this.root.innerHTML = '';
    this.root.appendChild(screenElement);
  }

  validateUserInput(input) {
    if (!this.gameState || !this.gameScreen) return;

    const result = this.gameState.validateInput(input);

    if (result === 'correct') {
      const nextRoundResult = this.gameState.nextRound();
      if (nextRoundResult === 'continue') {
        this.gameScreen.startNewRound(
          this.gameState.sequence,
          this.gameState.round
        );
      } else if (nextRoundResult === 'finished') {
        this.finishGame(true);
      }
    } else if (result === 'incorrect') {
      this.incorrectInput();
    }
  }

  incorrectInput() {
    if (!this.gameScreen || !this.gameState) return;

    if (this.gameState.hasExtraLive) {
      this.gameScreen.stopGame(true);
      this.gameState.hasExtraLive = false;
    } else {
      this.finishGame(false);
    }
  }

  finishGame(isSuccess) {
    if (!this.gameState) return;

    const screen = new ResultScreen(isSuccess, this.gameState.round);
    const resultScreenElement = screen.render(
      () => this.startGame(this.gameState?.level),
      this.init
    );
    this.renderScreen(resultScreenElement);
  }

  init() {
    const idleScreen = new IdleScreen();
    const idleScreenElement = idleScreen.render((level) =>
      this.startGame(level)
    );
    this.renderScreen(idleScreenElement);
  }
}

new SimonSays('#app');
