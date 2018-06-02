const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const fs = require('fs');
const {exec} = require('child_process');
const app = express();

app.use(bodyParser.json());
app.use(cors());

//

// Get platform root
app.get('/root', function (req, res) {
    try {
        const homeDir = os.homedir();
        const root = path.parse(homeDir).root;
        res.status(200).send({root: root});
    } catch(err) {
        res.status(400).send(err);
    }
});

// Get contents of the folder and file stats
app.post('/folder/', function(req, res) {
    const p = req.body.path;
    const content = fs.readdirSync(p);
    let result = [];

    content.forEach(e => {
        try {
            stats = fs.statSync(path.join(p, e));
            const type = stats.isDirectory() ? 'folder' : 'file';
            result.push({
                filename: e,
                stats: stats,
                path: path.join(p, e),
                type: type
            });
        } catch(err) {}
    });

    res.status(200).send(result);
})

app.post('/parent/', function(req, res) {
    const child = req.body.path;
    let parent;
    let p = path.parse(child);
    if(p.root === child) {
        parent = null;
    } else {
        parent = p.dir
    }
    res.status(200).send({parent: parent});
})

app.post('/content/', function(req, res) {
  const buffer = fs.readFileSync(req.body.path);
  const content = JSON.stringify(buffer);
  res.status(200).send({content: content});
})

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/file/', function(req, res) {
    console.log('openung', req.body.path);
    exec("\"" + req.body.path + "\"");
    res.status(200).send({});
})

app.listen(3000);
