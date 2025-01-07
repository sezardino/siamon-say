import { GAME_LEVEL_CHARACTERS } from '../../const/level';

/**
 * Generates a random sequence based on the selected difficulty level.
 *
 * @param {string} level - Selected difficulty level.
 * @param {number} length - Length of the sequence to generate.
 * @returns {string} - The generated sequence.
 */
export const generateSequence = (level, length) => {
  // Select the appropriate character set based on the level
  const availableChars = GAME_LEVEL_CHARACTERS[level.toUpperCase()];
  let sequence = '';

  // Generate random sequence
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    sequence += availableChars[randomIndex];
  }

  return sequence;
};
