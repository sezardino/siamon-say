import { GAME_LEVEL_CHARACTERS } from '../const';

// for dev purposes
const MAX_ROUNDS = 2;

export class GameState {
  constructor(level) {
    this.level = level;
    this.round = 1;
    this.sequence = '';
    this.userInput = '';
    this.hasExtraLive = true;
  }

  reset() {
    this.round = 1;
    this.hasExtraLive = true;
    this.userInput = '';
  }

  generateSequence() {
    const sequenceLength = this.round * 2;
    let sequence = '';
    for (let i = 0; i < sequenceLength; i++) {
      const symbols = GAME_LEVEL_CHARACTERS[this.level].split('');
      const randomKey = symbols[Math.floor(Math.random() * symbols.length)];
      sequence += randomKey;
    }
    this.sequence = sequence;
  }

  validateInput(input) {
    const loverInput = input.toLowerCase();

    if (loverInput === this.sequence) {
      return 'correct';
    } else if (!this.sequence.startsWith(loverInput)) {
      return 'incorrect';
    }
    return 'continue';
  }

  nextRound() {
    if (this.round < MAX_ROUNDS) {
      this.round += 1;
      this.generateSequence();
      return 'continue';
    }
    return 'finished';
  }
}
