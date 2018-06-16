"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var path = require("path");
var os = require("os");
var fs = require("fs");
var fsextra = require("fs-extra");
var child_process_1 = require("child_process");
var router = express_1.Router();
router.get('/root', function (req, res) {
    try {
        var homeDir = os.homedir();
        var root = path.parse(homeDir).root;
        res.status(200).send({ root: root });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
router.post('/folder', function (req, res) {
    var p = req.body.path;
    var content = fs.readdirSync(p);
    var result = [];
    content.forEach(function (e) {
        try {
            var stats = fs.statSync(path.join(p, e));
            var type = stats.isDirectory() ? 'folder' : 'file';
            result.push({
                filename: e,
                stats: stats,
                path: path.join(p, e),
                type: type
            });
        }
        catch (err) { }
    });
    res.status(200).send(result);
});
router.post('/parent', function (req, res) {
    var child = req.body.path;
    var parent;
    var p = path.parse(child);
    if (p.root === child) {
        parent = null;
    }
    else {
        parent = p.dir;
    }
    res.status(200).send({ parent: parent });
});
router.post('/content/', function (req, res) {
    var buffer = fs.readFileSync(req.body.path);
    var content = JSON.stringify(buffer);
    res.status(200).send({ content: content });
});
router.post('/file/', function (req, res) {
    child_process_1.exec('\"' + req.body.path + '\"');
    res.status(200).send({});
});
router.post('/copy/', function (req, res) {
    var source = req.body.source;
    var target = req.body.target + "/" + path.basename(source);
    setTimeout(function () {
        fsextra.copy(source, target)
            .then(function () { return res.status(200).send({}); })
            .catch(function (error) { return res.status(400).send({ error: error.message }); });
    }, 2500);
});
router.post('/remove', function (req, res) {
    var f = req.body.path;
    setTimeout(function () {
        fsextra.remove(f)
            .then(function () { return res.status(200).send({}); })
            .catch(function (error) { return res.status(400).send({ error: error.message }); });
    }, 2500);
});
exports.MainController = router;
//# sourceMappingURL=main.controller.js.map