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
export const createElement = (
  tag,
  className,
  textContent = '',
  attributes = {}
) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
    } else {
      element[key] = value;
    }
  });

  return element;
};
