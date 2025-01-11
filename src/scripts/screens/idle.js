// @ts-nocheck
import { Button } from '../components/button';
import { GAME_LEVELS, GAME_LEVELS_COPY } from '../const';
import { AbstractScreen } from './abstract';

export class IdleScreen extends AbstractScreen {
  createTitle() {
    return this.createElement(
      'h1',
      'text-4xl font-bold text-center mb-6',
      'Simon Says Game'
    );
  }

  createLevelSelect() {
    const select = this.createElement(
      'select',
      'mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
    );

    Object.values(GAME_LEVELS).forEach((level) => {
      const option = this.createElement('option', '', GAME_LEVELS_COPY[level], {
        value: level,
      });
      select.appendChild(option);
    });

    return select;
  }

  render(onStartGame) {
    const container = this.createElement(
      'div',
      'flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'
    );

    const title = this.createTitle();
    const levelSelector = this.createLevelSelect();

    const startGameHandler = () => {
      const level = levelSelector.value;
      onStartGame(level);
    };

    const startButton = new Button('Start', 'primary', startGameHandler)
      .element;

    container.appendChild(title);
    container.appendChild(levelSelector);
    container.appendChild(startButton);

    return container;
  }
}
