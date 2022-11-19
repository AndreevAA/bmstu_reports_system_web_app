"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
app.use('/', function (req, res) { return res.send("Hello world!"); });
app.listen(3000, function () { return console.log("Listening"); });
//# sourceMappingURL=index.js.map