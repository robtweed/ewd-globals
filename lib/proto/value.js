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
    var parent = this.parent;
    var db = parent.db;
    var current = db.get(node);
    var oldValue = current.data;
    var wasDefined = current.defined;
    node.data = value;
    // beforeSet event provides pointer to node and its new value to be
    parent.emit('beforeSet', node);
    db.set(node);
    node.oldValue = oldValue;
    node.previouslyDefined = wasDefined;
    node.newValue = value;
    // afterSet event provides pointer to node, and its old and new values
    parent.emit('afterSet', node);
  }
};