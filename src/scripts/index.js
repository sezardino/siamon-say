import { IdleScreen } from './screens/idle';

class SimonSays {
  constructor(rootSelector) {
    this.root = document.querySelector(rootSelector);

    if (!this.root) throw new Error('Root not provided');

    this.startGame = this.startGame.bind(this);

    this.init();
  }

  startGame(level) {
    if (!this.root) return;

    console.log(`Start game with level: ${level}`);
  }

  init() {
    if (!this.root) return;

    this.root.innerHTML = '';

    const idleScreen = new IdleScreen().render(this.startGame);

    this.root.appendChild(idleScreen);
  }
}

new SimonSays('#app');
