function increment() {
  var parent = this.parent;
  var db = parent.db;
  var node = this._node;
  parent.emit('beforeSet', node);
  var current = db.get(node);
  var oldValue = current.data;
  var wasDefined = current.defined;
  var data = db.increment(node).data;
  node.oldValue = oldValue;
  node.previouslyDefined = wasDefined;
  node.newValue = data;
  parent.emit('afterSet', node);
  return data;
};

module.exports = increment;
