import {Handlebars} from './lib.js';

window.HandlebarsIntl.registerWith(Handlebars);
window.HandlebarsFormHelpers.register(Handlebars);

Handlebars.registerHelper('ifCond', (v1, operator, v2, options) => {
  'use strict';
  switch (operator) {
    case '==':
      //noinspection EqualityComparisonWithCoercionJS,JSHint
      return (v1 == v2) ? options.fn(this) : options.inverse(this);
    case '===':
      return (v1 === v2) ? options.fn(this) : options.inverse(this);
    case '!=':
      //noinspection EqualityComparisonWithCoercionJS,JSHint
      return (v1 != v2) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (v1 !== v2) ? options.fn(this) : options.inverse(this);
    case '<':
      return (v1 < v2) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (v1 <= v2) ? options.fn(this) : options.inverse(this);
    case '>':
      return (v1 > v2) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (v1 >= v2) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (v1 && v2) ? options.fn(this) : options.inverse(this);
    case '||':
      return (v1 || v2) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

Handlebars.registerHelper('times', (n, options) => {
  'use strict';
  let accum = '';
  for (let i = 1; i <= n; ++i) {
    accum += options.fn(i);
  }
  return accum;
});
