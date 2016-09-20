var express = require('express');
var app = express();
var jsdom = require("jsdom");
var request = require('request');

app.get('/', function (req, res) {
  console.log("nodemon");
  var symbol_1 = "JPY";
  var symbol_2 = "HKD";
  jsdom.env(
    "http://www.xe.com/zh-HK/currencyconverter/convert/?Amount=1&From="+symbol_1+"&To="+symbol_2,
    ["http://code.jquery.com/jquery.js"],
    function (err, window) {
      var rate_raw = window.$(".uccRes .rightCol").html();
      var split_raw = rate_raw.split("&nbsp;");
      var rate = split_raw[0];
      console.log(rate);
      var id = symbol_1 + symbol_2;
      console.log(id);
      var json_obj = {
        result: []
      };
      json_obj.result.push({
        symbol: id,
        rate
      });
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(json_obj));
    }
  );
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
