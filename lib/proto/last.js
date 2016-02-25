module.exports = {
  enumerable: false,
  configurable: false,
  get: function() {
    return this._previous('');
  }
};
