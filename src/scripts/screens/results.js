import { Button } from '../components/button';
import { Typography } from '../components/typography';
import { AbstractScreen } from './abstract';

export class ResultScreen extends AbstractScreen {
  constructor(isSuccess, round) {
    super();
    this.isSuccess = isSuccess;
    this.round = round;
  }

  createTitle() {
    const message = this.isSuccess
      ? `Congratulations! You passed Round ${this.round}`
      : `Game Over! You failed Round ${this.round}`;

    return new Typography(message, '3xl', 'h2', 'text-center').element;
  }

  render(onPlayAgainClick, onResetClick) {
    const container = this.createElement(
      'div',
      'flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'
    );

    const message = this.createTitle();

    const buttonsContainer = this.createElement(
      'div',
      'mt-4 flex flex-wrap gap-2 items-center'
    );

    const playAgainButton = new Button('Play Again', 'green', onPlayAgainClick)
      .element;
    const resetGameButton = new Button(
      'Change difficulty',
      'yellow',
      onResetClick
    ).element;

    buttonsContainer.appendChild(playAgainButton);
    buttonsContainer.appendChild(resetGameButton);

    container.appendChild(message);
    container.appendChild(buttonsContainer);

    return container;
  }
}
