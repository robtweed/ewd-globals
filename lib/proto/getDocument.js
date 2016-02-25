function getDocument(useArrays, base) {
  var db = this.parent.db;
  if (!base) base = 0;
  var globalName = this._globalName;

  var arrayOfSubscripts = function(globalNode) {
    var expected = base;
    var isArray = true;
    var subs = globalNode.subscripts.slice(0);
    subs.push("");
    var node = {global: globalName, subscripts: subs};
    var result;  
    do {
      node = db.order(node);
      result = node.result;
      if (result !== '') {
        if (+result !== expected) {
          isArray = false;
          break;
        } 
        else {
          expected++;
        }
      }
    }
    while (result !== '');
    return isArray;
  };

  var getSubnodes = function(globalNode) {
    var isArray = false;
    if (useArrays) isArray = arrayOfSubscripts(globalNode);
    var document;
    if (isArray) {
      document = [];
    }
    else {
      document = {};
    }
    var result;
    var subs = globalNode.subscripts.slice(0);
    subs.push('');
    var defined;
    var node = {global: globalName, subscripts: subs};
    var index;
    do {
      node = db.order(node);
      result = node.result;
      if (result !== '') {
        index = result;
        if (isArray) index = index - base;
        defined = db.data(node).defined;
        if (defined === 1 || defined === 11) {
          document[index] = db.get(node).data;
          if (document[index] === 'true') document[index] = true;
          if (document[index] === 'false') document[index] = false;
        }
        if (defined === 10 || defined === 11) {
          document[index] = getSubnodes(node);
        }
      }
    }
    while (result !== '');
    return document;
  };

  var fastGetDocument = function(node) {
    var noOfSubscripts = node.subscripts.length;

    var addToJSON = function(obj, subscripts, value) {

      var append = function(obj, subscript) {
        // Fix courtesy of David Wicksell, Fourthwatch Software. 
        //  To cater for Global nodes with both data and child subscripts, change:
        //if (typeof obj[subscript] === 'undefined') {
        // to:

        if (typeof obj[subscript] !== 'object' || typeof obj[subscript] === 'undefined') {

        // end of fix

	   obj[subscript] = {};
	 }
        return obj[subscript];
      };
  
      var build = function(obj) {
        i++;
        if (i === subscripts.length) {
	   obj = value;
	   return obj;
        }
        var obj2 = append(obj, subscripts[i]);
        obj[subscripts[i]] = build(obj2);
        return obj;
      };

      var i = -1;
      obj = build(obj);
      return obj;
    };

    var isSubNode = function(signature, currentArray) {
      var match = true;
      for (var i = 0; i < signature.length; i++) {
        if (signature[i].toString() !== currentArray[i].toString()) {
          match = false;
          break;
        }
      }
      return match;
    };

    var document = {};
    var signature = node.subscripts;
    var match = true;
    var subsCopy;
    do {
      node = db.next_node(node);
      match = false;
      if (node.defined !== 0) match = isSubNode(signature, node.subscripts);
      if (match) {
        subsCopy = node.subscripts.slice(0);
        subsCopy.splice(0, noOfSubscripts);
        document = addToJSON(document, subsCopy, node.data);
      }  
    } while (match);
    return document;
  };

  if (!useArrays) {
    if (db.next_node(this._node).ok) {
      return fastGetDocument(this._node);
    }
    else {
      return getSubnodes(this._node);
    }
  }
  else {
    return getSubnodes(this._node);
  }
};

module.exports = getDocument;