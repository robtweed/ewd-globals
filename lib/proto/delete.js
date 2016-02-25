function del() {
  var parent = this.parent;
  var db = parent.db;
  parent.emit('beforeDelete', this._node);
  var node = this._node;
  var current = db.get(node);
  var oldValue = current.data;
  var wasDefined = current.defined;
  db.kill(node);
  node.oldValue = oldValue;
  node.previouslyDefined = wasDefined;
  parent.emit('afterDelete', node);
}

module.exports = del;