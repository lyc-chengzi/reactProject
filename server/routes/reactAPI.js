var express = require('express');
var router = express.Router();
var rm = require('../model/ResultModel');
var webData = require('../model/webData');

/* GET users listing. */
router.get('/demoList', function(req, res, next) {
  var result = new rm(200, "", webData.indexList);
  res.send(JSON.stringify(result));
});

module.exports = router;
