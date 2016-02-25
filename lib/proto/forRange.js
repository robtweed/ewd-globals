function fr(fromSubscript, toSubscript, callback) {
  // to iterate in reverse: 
  // globalNode._forRange({from: 'r', to: 'd', direction: 'reverse'}, function(index) {
  //   console.log("index: " + index);
  // });

  var end = '';
  var result;
  var gnode;
  var subs;
  var node;
  var seed;
  var quit;
  var db = this.parent.db;
  var direction = 'forwards';
  if (arguments.length === 2) {
    var args = arguments[0];
    callback = arguments[1]; 
    if (args.direction === 'reverse') direction = 'reverse';
    fromSubscript = args.from;
    toSubscript = args.to;
  }
  if (direction === 'forwards') {
    if (toSubscript !== '') {
      subs = this._subscripts.slice(0);
      subs.push(toSubscript);
      node = {global: this._globalName, subscripts: subs};
      end = db.order(node).result;
    }
    subs = this._subscripts.slice(0);
    subs.push(fromSubscript);
    node = {global: this._globalName, subscripts: subs};
    seed = db.previous(node).result;
    quit = false;
    do {
      node = db.order(node);
      result = node.result;
      if (result !== end) {
        gnode = this.$(result);
        quit = callback(result, gnode, this);
        if (quit) break;
      }
    }
    while (result !== end);
  }
  else {
    if (toSubscript !== '') {
      subs = this._subscripts.slice(0);
      subs.push(toSubscript);
      node = {global: this._globalName, subscripts: subs};
      end = db.previous(node).result;
    }
    subs = this._subscripts.slice(0);
    subs.push(fromSubscript);
    node = {global: this._globalName, subscripts: subs};
    seed = db.next(node).result;
    quit = false;
    do {
      node = db.previous(node);
      result = node.result;
      if (result !== end) {
        gnode = this.$(result);
        quit = callback(result, gnode, this);
        if (quit) break;
      }
    }
    while (result !== end);
  }
};

module.exports = fr;
