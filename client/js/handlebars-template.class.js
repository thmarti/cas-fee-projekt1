import {Handlebars} from './lib.js';

export default class HandlebarsTemplate {
  constructor(templateName) {
    this.path = 'templates/' + templateName + '.hbs';
  }

  render(element, data) {
    if (typeof element === 'string') {
      this.el = document.getElementById(element);
    } else {
      this.el = element;
    }

    return this.getCompiledTemplate().then(template => this.el.innerHTML = template(data));
  }

  getCompiledTemplate() {
    if (!this.compiledTemplate) {
      return fetch(this.path)
        .then(response => response.text())
        .then(template => {
          this.compiledTemplate = Handlebars.compile(template);
          return this.compiledTemplate;
        })
        .catch(e => window.console.error(`Fetch Error for ${this.path}`, e));
    } else {
      return Promise.resolve(this.compiledTemplate);
    }
  }
}
