// @ts-nocheck

import { Button } from '../components/button';
import { Typography } from '../components/typography';
import { GAME_LEVELS, GAME_LEVELS_COPY } from '../const/game';
import { AbstractScreen } from './abstract';

export class IdleScreen extends AbstractScreen {
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

    const title = new Typography(
      'Simon Says Game',
      '4xl',
      'h1',
      'text-center mb-6'
    ).element;

    const hint = new Typography(
      '?',
      '4xl',
      'span',
      'cursor-pointer ml-2 border inline-flex items-center border-blue-400 justify-center h-12 w-12 rounded-full'
    ).element;
    hint.title =
      'To check, you can open the developer console where the current sequence will be displayed. We do not recommend using prompts if you want to test your skills.';
    title.appendChild(hint);
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
