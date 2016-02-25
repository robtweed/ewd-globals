function getParent() {
  var subs = this._subscripts.slice(0);
  if (subs.length > 0) {
    subs.pop();
    return new this.parent.GlobalNode(this._globalName, subs);
  }
  else {
    return;
  }
}


module.exports = {
  enumerable: false,
  configurable: false,
  get: function() {
    return getParent.call(this);
  }
};
