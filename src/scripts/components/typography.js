import { createElement } from '../utils/create-element';

const TYPOGRAPHY_STYLES = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base', // Default font size
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
};

const headingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

/**
 * Class representing a reusable typography component with customizable styles and behavior.
 */
export class Typography {
  /**
   * Creates a Typography instance.
   * @param {string} text - The text content for the typography element.
   * @param {string} [size='base'] - The font size for the typography element (default: 'base').
   * @param {string} [level='p'] - The HTML tag for the typography element ('h1', 'h2', 'h3', 'p', 'span', etc.).
   * @param {string} [customStyles=''] - Additional custom styles for the typography element (e.g., margin, padding).
   */
  constructor(text, size = 'base', level = 'p', customStyles = '') {
    /**
     * @property {string} text - The text content for the typography element.
     */
    this.text = text;

    /**
     * @property {string} size - The font size for the typography element.
     */
    this.size = size;

    /**
     * @property {string} level - The HTML tag for the typography element (e.g., 'h1', 'h2', 'p', etc.).
     */
    this.level = level;

    /**
     * @property {string} customStyles - Additional custom styles for the typography element.
     */
    this.customStyles = customStyles;

    /**
     * @property {HTMLElement} element - The typography DOM element.
     */
    this.element = this.createTypographyElement();
  }

  /**
   * Creates the typography element (e.g., h1, h2, p, span).
   * @returns {HTMLElement} The typography DOM element.
   */
  createTypographyElement() {
    const baseStyles = `${TYPOGRAPHY_STYLES[this.size]}${headingTags.includes(this.level) ? ' font-bold' : ''}`;
    const element = createElement(this.level, baseStyles, this.text);

    if (this.customStyles) {
      element.classList.add(...this.customStyles.split(' '));
    }

    return element;
  }
}
