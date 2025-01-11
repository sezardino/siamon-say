import { createElement } from '../utils/create-element';

export class AbstractScreen {
  /**
   * Creates an HTML element with specified attributes and content.
   *
   * @param {string} tag - The HTML tag name for the element (e.g., 'div', 'button').
   * @param {string} className - The class names to apply to the element (space-separated).
   * @param {string} [textContent=''] - The text content to set for the element (optional).
   * @param {Object} [attributes={}] - Additional attributes to set on the element (e.g., { id: 'my-id', disabled: true }).
   *
   * @returns {HTMLElement} The created HTML element.
   *
   * @example
   * // Create a button with classes and attributes
   * const button = this.createElement('button', 'btn btn-primary', 'Click Me', { disabled: true });
   *
   * @example
   * // Create a div with a specific ID
   * const container = this.createElement('div', 'container', '', { id: 'main-container' });
   */
  createElement(tag, className, textContent = '', attributes = {}) {
    return createElement(tag, className, textContent, attributes);
  }

  /**
   * Temporarily adds a set of CSS classes to a DOM element and removes them after a specified delay.
   *
   * @param {HTMLElement} element - The DOM element to which the classes will be added.
   * @param {string[]} classesArr - An array of CSS class names to add to the element.
   * @param {number} removeDelay - The time in milliseconds after which the classes will be removed.
   *
   * @example
   * // Add 'highlight' and 'active' classes to a button for 2 seconds
   * const button = document.querySelector('#myButton');
   * addTempClasses(button, ['highlight', 'active'], 2000);
   *
   * @example
   * // Add a single class 'fade-in' to an element for 1 second
   * const element = document.querySelector('#myElement');
   * addTempClasses(element, ['fade-in'], 1000);
   */
  addTempClasses(element, classesArr, removeDelay) {
    element.classList.add(...classesArr);
    setTimeout(() => {
      element.classList.remove(...classesArr);
    }, removeDelay);
  }
}
