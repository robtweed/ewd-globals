module.exports = {
  enumerable: false,
  configurable: false,
  get: function() {
    var i;
    var names = {};
    for (i = 0; i < this._keys.length; i++) {
      names[this._keys[i]] = '';
    }
    return names;
  }
};
