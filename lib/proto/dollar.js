function dollar(subscript) {
  // don't overwrite a global node's preset properties or methods
  if (subscript in this._reservedNames) return false;
  var subs = this._subscripts.slice(0);
  subs.push(subscript);
  if (typeof this[subscript] === 'undefined') this[subscript] = new this.parent.GlobalNode(this._globalName,subs);
  return this[subscript];
};

module.exports = dollar;