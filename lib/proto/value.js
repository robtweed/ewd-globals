module.exports = {
  enumerable: true,
  configurable: false,
  get: function() {
    var value = this.parent.db.get(this._node).data;
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    return value;
  },
  set: function(value) {
    var node = this._node;
    this.set.call(this, node, value);
  }
};