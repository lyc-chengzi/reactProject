var express = require('express');
var router = express.Router();
var rm = require('../model/ResultModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var _env = req.query.env;
  var urlBase = '';
  if(_env == 'static'){
      urlBase += 'src/pages';
  }
  var indexData = [{
    "id": "demo1",
    "url": urlBase + "/demo1/demo1.html",
    "text": "demo1 - 基本用法"
  }, {
    "id": "demo2",
    "url": urlBase + "/demo2/demo2.html",
    "text": "demo2 - Flux基本使用"
  }];

  var result = new rm(200, "", indexData);
  res.send(JSON.stringify(result));
});

module.exports = router;
