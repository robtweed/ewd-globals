module.exports = function(seed) {
  var subs = this._subscripts.slice(0);
  subs.push(seed);
  var node = {global: this._globalName, subscripts: subs};
  return this.parent.db.previous(node).result;
};