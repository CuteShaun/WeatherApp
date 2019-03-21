export default class Component {
  constructor(host, props = {}) {
    this.host = host;
    this.props = props;
    this.beforeRender();
    this._render();
  }

  beforeRender() {}

  // afterRender() {}

  _render(data) {
    this.host.innerHTML = ""

    let content;

    if(data === undefined) {
      content = this.render("");
    }


    content = this.render(data);

    if (!Array.isArray(content)) {
      content = [content];
      this.host.innerHTML = content;
    }

    content
      .map(item => this._vDomPrototypeElementToHtmlElement(item)) // [string|HTMLElement] => [HTMLElement]
      .forEach(htmlElement => {
        this.host.appendChild(htmlElement);
      });
  }
  /* @returns {string|[string|HTMLElement|Component]} */
  render() {
    return "OMG! They wanna see me!!!!!! Aaaaaa";
  }

  /**
   *
   * @param {string|HTMLElement|Object} element
   * @private
   */
  _vDomPrototypeElementToHtmlElement(element) {
    if (typeof element === "string") {
      const htmlElement = document.createDocumentFragment(); // TODO: textNode
      htmlElement.innerHTML = element;
      return htmlElement;
    } else {
      if (element.tag) {
        if (typeof element.tag === "function") {
          let container = document.createDocumentFragment();

          new element.tag(container, element.props);

          if ([...container.children].length === 0) {
            container = document.createElement("div");
            new element.tag(container, element.props);
          }

          return container;
        } else {
          // string
          const container = document.createElement(element.tag);
          if (element.content) {
            container.innerHTML = element.content;
          }

          // ensure following element properties are Array
          ["classList", "attributes", "children"].forEach(item => {
            if (element[item] && !Array.isArray(element[item])) {
              element[item] = [element[item]];
            }
          });
          if (element.classList) {
            container.classList.add(...element.classList);
          }
          if (element.attributes) {
            element.attributes.forEach(attributeSpec => {
              if (attributeSpec.name === "required") {
                container.setAttribute(attributeSpec.name, "");
              } else {
                container.setAttribute(attributeSpec.name, attributeSpec.value);
              }
            });
          }

          if (element.eventHandlers) {
            element.eventHandlers.forEach(eventHandlersSpec => {
              container.addEventListener(
                eventHandlersSpec.eventType,
                eventHandlersSpec.handler
              );
            });
          }

          // process children
          if (element.children) {
            element.children.forEach(el => {
              const htmlElement = this._vDomPrototypeElementToHtmlElement(el);
              container.appendChild(htmlElement);
            });
          }

          return container;
        }
      }
      return element;
    }
  }
}
