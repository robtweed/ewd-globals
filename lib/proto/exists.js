module.exports = {
  enumerable: true,
  configurable: false,
  get: function() {
    var def = this._defined;
    return def !== 0;
  }
};