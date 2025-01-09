const SCREEN_IDS = {
  PLAY_AGAIN: 'play-again',
  CHANGE_DIFFICULTY: 'change-difficulty',
};

export class ResultScreen {
  constructor(isSuccess, round) {
    this.isSuccess = isSuccess;
    this.round = round;
  }

  generateScreenMessage(isSuccess, round) {
    return isSuccess
      ? `Congratulations! You passed Round ${round}`
      : `Game Over! You failed Round ${round}`;
  }

  render(onPlayAgainClick, onChangeDifficultyClick) {
    const container = document.createElement('div');
    container.className =
      'flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6';

    const message = document.createElement('h2');
    message.className = 'text-3xl font-bold text-center';
    message.textContent = this.generateScreenMessage(
      this.isSuccess,
      this.round
    );

    const playAgainButton = document.createElement('button');
    playAgainButton.id = SCREEN_IDS.PLAY_AGAIN;
    playAgainButton.textContent = 'Play Again';
    playAgainButton.className =
      'px-6 py-2 bg-green-500 text-white rounded-lg mt-4';
    playAgainButton.addEventListener('click', onPlayAgainClick);

    const changeDifficultyButton = document.createElement('button');
    changeDifficultyButton.id = SCREEN_IDS.CHANGE_DIFFICULTY;
    changeDifficultyButton.textContent = 'Change Difficulty';
    changeDifficultyButton.className =
      'px-6 py-2 bg-yellow-500 text-white rounded-lg mt-4';
    changeDifficultyButton.addEventListener('click', onChangeDifficultyClick);

    container.appendChild(message);
    container.appendChild(playAgainButton);
    container.appendChild(changeDifficultyButton);

    return container;
  }
}
