module.exports = {
  enumerable: true,
  configurable: false,
  get: function() {
    var def = this.parent.db.data(this._node).defined;
    if (typeof def === 'undefined') return 0;
    return def;
  }
};
