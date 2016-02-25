module.exports = function(funcName) {
  var args = [];
  var i;
  if (arguments.length > 1) {
    for (i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
  }
  if (funcName !== 'relink^%zewdGTMRuntime' && this.version().indexOf('GT.M') !== -1) {
    // check for relinking
    // equivalent of i $g(^%zewd("relink"))=1,'$d(^%zewd("relink","process",$j)) s ok=$$relink^%zewdGTMRuntime()
    var relink = new this.GlobalNode('%zewd', ['relink']);
    if (relink._value === 1) {
      if (!relink.$('process').$(process.pid)._exists) {
        var ok = this.db.function({
          function: 'relink^%zewdGTMRuntime'
        });
      }
    }
  }
  var result;
  try {
    result = this.db.function({function: funcName, arguments: args}).result;
  }
  catch(err) {
    return {
      error: err
    };
  }
  return result;
};
