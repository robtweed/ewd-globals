module.exports = function(range) {
  range = range || {};
  return this.db.global_directory(range);
};
