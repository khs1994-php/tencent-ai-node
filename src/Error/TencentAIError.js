'use strict';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
module.exports = class TencentAIError extends Error {
  constructor(message, code, ...args) {
    super(...args);
  }
};
