var express = require("express");
var router = express.Router();

/* GET service status. */
router.get("/status", function(req, res, next) {
  res.send({
    service: "layer-schemes-service",
    status: "working"
  });
});

module.exports = router;
