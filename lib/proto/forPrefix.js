function fp(prefx, callback) {
  // to iterate in reverse: 
  // globalNode._forPrefix({prefix: 've', direction: 'reverse'}, function(index) {
  //   console.log("index: " + index);
  // });

  var result;
  var gnode;
  var subs;
  var node;
  var seed;
  var quit;
  var db = this.parent.db;
  var direction = 'forwards';
  if (typeof arguments[0] !== 'string') {
    var args = arguments[0];
    if (args.direction === 'reverse') direction = 'reverse';
    prefx = args.prefix;
  }
  if (direction === 'forwards') {
    if (prefx === '') return;
    subs = this._subscripts.slice(0);
    subs.push(prefx);
    node = {global: this._globalName, subscripts: subs};
    node = db.previous(node);
    seed = node.result;
    subs = this._subscripts.slice(0);
    subs.push(seed);
    node = {global: this._globalName, subscripts: subs};
    quit = false;
    do {
      node = db.order(node);
      result = node.result;

      if (result !== '') {
        //if (result.indexOf(prefx) === -1) break;
        if (result.substr(0, prefx.length) !== prefx) break;
        gnode = this.$(result);
        quit = callback(result, gnode, this);
        if (quit) break;
      }
    }
    while (result !== '');
  }
  else {
    if (prefx === '') return;
    subs = this._subscripts.slice(0);
    subs.push(prefx);
    node = {global: this._globalName, subscripts: subs};
    do {
      node = db.order(node);
      result = node.result;
      if (result !== '') {
        //if (result.indexOf(prefx) === -1) break;
        if (result.substr(0, prefx.length) !== prefx) break;
      }
    }
    while (result !== '');
    seed = node.result;
    subs = this._subscripts.slice(0);
    subs.push(seed);
    node = {global: this._globalName, subscripts: subs};
    quit = false;
    do {
      node = db.previous(node);
      result = node.result;
      if (result !== '') {
        //if (result.indexOf(prefx) === -1) break;
        if (result.substr(0, prefx.length) !== prefx) break;
        gnode = this.$(result);
        quit = callback(result, gnode, this);
        if (quit) break;
      }
    }
    while (result !== '');
  }
};

module.exports = fp;
