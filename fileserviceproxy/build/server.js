"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var controllers_1 = require("./controllers");
var app = express();
var port = 3000;
app.use(bodyParser.json());
app.use(cors());
app.use('/', controllers_1.MainController);
app.listen(port, function () {
    console.log("Listening on http://localhost:" + port);
});
//# sourceMappingURL=server.js.map