export class ResultScreen {
  constructor(isSuccess, round) {
    this.isSuccess = isSuccess;
    this.round = round;
  }

  generateTitle() {
    const title = document.createElement('h2');
    title.className = 'text-3xl font-bold text-center';
    title.textContent = this.isSuccess
      ? `Congratulations! You passed Round ${this.round}`
      : `Game Over! You failed Round ${this.round}`;

    return title;
  }

  generatePlayAgainButton(onClick) {
    const button = document.createElement('button');
    button.textContent = 'Play Again';
    button.className = 'px-6 py-2 bg-green-500 text-white rounded-lg mt-4';
    button.addEventListener('click', onClick);

    return button;
  }

  generateResetGameButton(onClick) {
    const button = document.createElement('button');
    button.textContent = 'Change Difficulty';
    button.className = 'px-6 py-2 bg-yellow-500 text-white rounded-lg mt-4';
    button.addEventListener('click', onClick);

    return button;
  }

  render(onPlayAgainClick, onResetClick) {
    const container = document.createElement('div');
    container.className =
      'flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6';

    const message = this.generateTitle();
    const playAgainButton = this.generatePlayAgainButton(onPlayAgainClick);
    const resetGameButton = this.generateResetGameButton(onResetClick);

    container.appendChild(message);
    container.appendChild(playAgainButton);
    container.appendChild(resetGameButton);

    return container;
  }
}
