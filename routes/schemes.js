var express = require("express");
var router = express.Router();

/* GET layers schemes list */
router.get("/", function(req, res) {
  const result = req.store.getSchemes();
  if (result) {
    res.send(result);
  } else {
    res.sendStatus(400);
  }
});

/* GET layer scheme by id */
router.get("/:id", function(req, res, next) {
  const id = req.params.id;
  const layerScheme = req.store.getScheme(id);
  if (layerScheme) {
    res.send(layerScheme);
  } else {
    res.sendStatus(404);
  }
});

// router.post("/", function(req, res, next) {
//   const layer = req.body;
//   const result = false;
//   if (result) {
//     res.send(200);
//   } else {
//     res.send(400);
//   }
// });

// router.put("/:id", function(req, res, next) {
//   const id = req.params.id;
//   const layer = req.body;
//   const result = false;
//   if (result) {
//     res.send(200);
//   } else {
//     res.send(400);
//   }
// });

// router.delete("/:id", function(req, res, next) {
//   const id = req.params.id;
//   const result = false;
//   if (result) {
//     res.send(200);
//   } else {
//     res.send(400);
//   }
// });

module.exports = router;
