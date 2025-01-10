import { AbstractScreen } from './abstract';

export class ResultScreen extends AbstractScreen {
  constructor(isSuccess, round) {
    super();
    this.isSuccess = isSuccess;
    this.round = round;
  }

  createTitle() {
    return this.createElement(
      'h2',
      'text-3xl font-bold text-center',
      this.isSuccess
        ? `Congratulations! You passed Round ${this.round}`
        : `Game Over! You failed Round ${this.round}`
    );
  }

  createPlayAgainButton(onClick) {
    const button = this.createElement(
      'button',
      'px-6 py-2 bg-green-500 text-white rounded-lg mt-4',
      'Play Again'
    );

    button.addEventListener('click', onClick);

    return button;
  }

  createResetGameButton(onClick) {
    const button = this.createElement(
      'button',
      'px-6 py-2 bg-yellow-500 text-white rounded-lg mt-4',
      'Change Difficulty'
    );

    button.addEventListener('click', onClick);

    return button;
  }

  render(onPlayAgainClick, onResetClick) {
    const container = this.createElement(
      'div',
      'flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'
    );

    const message = this.createTitle();
    const playAgainButton = this.createPlayAgainButton(onPlayAgainClick);
    const resetGameButton = this.createResetGameButton(onResetClick);

    container.appendChild(message);
    container.appendChild(playAgainButton);
    container.appendChild(resetGameButton);

    return container;
  }
}
