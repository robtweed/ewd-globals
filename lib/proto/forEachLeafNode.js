function feln(callback) {
  // iterates physical node by node - in Mumps terms using $QUERY

  var isWithinRoot = function(signature, currentArray) {
    // has it moved beyond the root Global Node that originally seeded the loop?  If so, stop the loop

    var match = true;
    for (var i = 0; i < signature.length; i++) {
      if (signature[i].toString() !== currentArray[i].toString()) {
        match = false;
        break;
      }
    }
    return match;
  };

  var node = this._node;
  var ok = true;
  var quit;
  var db = this.parent.db;
  var globalNode = this.parent.GlobalNode;
  var subscripts = this._subscripts;
  do {
    node = db.next_node(node);
    if (node.defined !== 0) {
      if (isWithinRoot(subscripts, node.subscripts)) {
        quit = callback(node.data, new globalNode(node.global, node.subscripts), this);
        if (quit === false) ok = false;
      }
      else {
        ok = false;
      }
    }
    else {
      ok = false;
    }
  } while (ok);
};

module.exports = feln;
