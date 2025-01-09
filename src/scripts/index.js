import { GameScreen } from './screens/game';
import { IdleScreen } from './screens/idle';

class SimonSays {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);

    if (!this.root) throw new Error('Root not provided');

    this.currentScreen = null;

    this.startGame = this.startGame.bind(this);

    this.init();
  }

  renderScreen(screenElement) {
    if (!this.root) return;

    this.root.innerHTML = '';

    this.root.appendChild(screenElement);
  }

  startGame(level) {
    if (!this.root) return;

    this.currentScreen = new GameScreen(level);
    const gameScreenElement = this.currentScreen.render();

    this.renderScreen(gameScreenElement);
  }

  init() {
    this.currentScreen = new IdleScreen();
    const idleScreenElement = this.currentScreen.render(this.startGame);

    this.renderScreen(idleScreenElement);
  }
}

new SimonSays('#app');
