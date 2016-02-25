function fe(callback) {
  // to iterate in reverse: 
  //  globalNode._forEach({direction: 'reverse'}, function(index) {
  //    console.log("index: " + index);
  //  });

  var result;
  var gnode;
  var db = this.parent.db;
  var direction = 'forwards';
  if (arguments.length > 1) {
    if (arguments[0].direction === 'reverse') direction = 'reverse';
    callback = arguments[1]; 
  }
  var subs = this._subscripts.slice(0);
  subs.push('');
  var node = {global: this._globalName, subscripts: subs};
  var quit = false;
  do {
    if (direction === 'forwards') {
      node = db.order(node);
    }
    else {
      node = db.previous(node);
    }
    result = node.result;
    if (result !== '') {
      gnode = this.$(result);
      quit = callback(result, gnode, this);
      if (quit) break;
    }
  }
  while (result !== '');
};

module.exports = fe;