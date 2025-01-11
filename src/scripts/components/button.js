// @ts-nocheck

import { createElement } from '../utils/create-element';

const BASIC_BUTTON_STYLES =
  'px-6 py-2 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 transition-all duration-300 disabled:bg-opacity-40';

/**
 * Class representing a reusable button component with customizable styles and behavior.
 */
export class Button {
  /**
   * Creates a Button instance.
   * @param {string} text - The text content of the button.
   * @param {string} [variantOrStyles='primary'] - The style variant ('primary', 'danger', 'green', 'yellow') or custom CSS classes.
   * @param {Function|null} [onClick=null] - The callback function to be executed on button click.
   * @param {Object} [additionalAttributes={}] - Additional attributes to set on the button element (e.g., { id: 'start-button', 'data-key': 'start' }).
   */
  constructor(
    text,
    variantOrStyles = 'primary',
    onClick = null,
    additionalAttributes = {}
  ) {
    /**
     * @property {string} text - The text content of the button.
     */
    this.text = text;

    /**
     * @property {string} variantOrStyles - The style variant or custom CSS classes.
     */
    this.variantOrStyles = variantOrStyles;

    /**
     * @property {Function|null} onClick - The callback function for the button's click event.
     */
    this.onClick = onClick;

    /**
     * @property {Object} additionalAttributes - Additional attributes for the button element.
     */
    this.additionalAttributes = additionalAttributes;

    /**
     * @property {HTMLElement} element - The button DOM element.
     */
    this.element = this.createButton();
  }

  /**
   * Gets the styles for the specified variant or custom styles.
   * @returns {string} A string containing the CSS classes for the button variant or custom styles.
   */
  getVariantStyles() {
    const variants = {
      primary: 'bg-blue-500 focus:ring-blue-500',
      danger: 'bg-red-500 focus:ring-red-500',
      green: 'bg-green-500 focus:ring-green-500',
      yellow: 'bg-yellow-500 focus:ring-yellow-500',
    };

    if (variants[this.variantOrStyles]) {
      return variants[this.variantOrStyles];
    }

    return this.variantOrStyles;
  }

  /**
   * Creates the button element.
   * @returns {HTMLElement} The button DOM element.
   */
  createButton() {
    const variantStyles = this.getVariantStyles();

    const button = createElement(
      'button',
      `${BASIC_BUTTON_STYLES} ${variantStyles}`,
      this.text
    );

    Object.keys(this.additionalAttributes).forEach((key) => {
      button.setAttribute(key, this.additionalAttributes[key]);
    });

    if (this.onClick) {
      button.addEventListener('click', this.onClick);
    }

    return button;
  }
}
