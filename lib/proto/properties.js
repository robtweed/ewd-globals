module.exports = {
  enumerable: false,
  configurable: false,
  get: function() {
    var properties = [];
    var subs = this._subscripts.slice(0);
    subs.push('');
    var node = {global: this._globalName, subscripts: subs};
    do {
      node = this.parent.db.order(node);
      if (node.result !== '') properties.push(node.result);
    }
    while (node.result !== '');
    return properties;
  }
};