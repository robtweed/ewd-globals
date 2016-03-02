function setDocument(document, offset) {
  var set = this.set;
  var worker = this;
  var globalName = this._globalName;
  if (!offset) offset = 0;

  var setFast = function(obj, globalNode) {
    var subs;
    var i;
    var j;
    var value;
    for (i in obj){
      if (obj[i] === null) obj[i] = '';
      if (obj[i] instanceof Array) {
        console.log('Array! ' + JSON.stringify(obj[i]));
        if (obj[i].length !== 0) {
          for (j = 0; j < obj[i].length; j++) {
            if (typeof obj[i][j] === 'object') {
              subs = globalNode.subscripts.slice(0);
              subs.push(i);
              subs.push(j + offset);
              setFast(obj[i][j], {global: globalName, subscripts: subs});
            } 
            else {
              value = obj[i][j];
              if (value === null) value = '';
              subs = globalNode.subscripts.slice(0);
              subs.push(i);
              subs.push(j + offset);
              node = {global: globalName, subscripts: subs};
              set.call(worker, node, value);
            }
          }
        }
      }
      if (typeof obj[i] !== 'object') {
        value = obj[i];
        if (value === null) value = '';
        subs = globalNode.subscripts.slice(0);
        subs.push(i);
        node = {global: globalName, subscripts: subs};
        set.call(worker, node, value);
      }   
      if (obj[i] instanceof Object && !(obj[i] instanceof Array)) {
        subs = globalNode.subscripts.slice(0);
        subs.push(i);
        setFast(obj[i], {global: globalName, subscripts: subs});
      }
    }
  };

  setFast(document, {global: globalName, subscripts: this._subscripts.slice(0)});
};

module.exports = setDocument;
