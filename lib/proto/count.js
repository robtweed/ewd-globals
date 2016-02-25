module.exports = function() {
  var count = 0;
  this._forEach(function(key) {
    count++;
  });
  return count;
};