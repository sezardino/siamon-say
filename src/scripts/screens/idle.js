const GAME_LEVELS = {
  easy: 'easy',
  medium: 'medium',
  hard: 'hard',
};

const GAME_LEVELS_COPY = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export class IdleScreen {
  getLevelSelect() {
    const select = document.createElement('select');
    select.className =
      'mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500';

    Object.values(GAME_LEVELS).forEach((level) => {
      const option = document.createElement('option');
      option.value = level;
      option.textContent = GAME_LEVELS_COPY[level];
      select.appendChild(option);
    });

    return select;
  }

  getStartButton(onClick) {
    const button = document.createElement('button');
    button.textContent = 'Start';
    button.className =
      'px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500';
    button.addEventListener('click', onClick);

    return button;
  }

  render(onStartGame) {
    const container = document.createElement('div');
    container.className =
      'flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6';

    const levelSelector = this.getLevelSelect();

    const startGameHandler = () => {
      const level = levelSelector.value;
      onStartGame(level);
    };

    const startButton = this.getStartButton(startGameHandler);

    container.appendChild(levelSelector);
    container.appendChild(startButton);

    return container;
  }
}
