const createStore = require("./create");

module.exports = function() {
  return function(req, res, next) {
    req.store = createStore();
    next();
  };
};
