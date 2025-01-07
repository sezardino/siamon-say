export const GAME_LEVELS = ['Easy', 'Medium', 'Hard'];

export const allDigits = '0123456789';

export const allLetters =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const GAME_LEVEL_CHARACTERS = {
  EASY: allDigits, // Only digits for easy level
  MEDIUM: allLetters, // Only letters for medium level
  HARD: `${allDigits}${allLetters}`, // Letters and digits for hard level
};
