function set(node, value) {
  this.parent.emit('beforeSet', node);
  var db = this.parent.db;
  var current = db.get(node);
  var oldValue = current.data;
  var wasDefined = current.defined;
  node.data = value;
  db.set(node);
  node.oldValue = oldValue;
  node.previouslyDefined = wasDefined;
  node.newValue = value;
  this.parent.emit('afterSet', node);
}

module.exports = set;