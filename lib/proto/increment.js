function increment() {
  var parent = this.parent;
  var db = parent.db;
  parent.emit('beforeSet', this._node);
  var node = this._node;
  var current = db.get(node);
  var oldValue = current.data;
  var wasDefined = current.defined;
  var data = db.increment(this._node).data;
  node.data = data;
  node.newValue = data;
  node.oldValue = oldValue;
  node.previouslyDefined = wasDefined;
  parent.emit('afterSet', node);
  return data;
};

module.exports = increment;