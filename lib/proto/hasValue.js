module.exports = {
  enumerable: true,
  configurable: false,
  get: function() {
    return ((this._defined === 1)||(this._defined === 11));
  }
};
