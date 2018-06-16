import {Router, Request, Response} from 'express';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as fsextra from 'fs-extra';
import {exec} from 'child_process';

const router: Router = Router();

router.get('/root', (req: Request, res: Response) => {
  try {
    const homeDir = os.homedir();
    const root = path.parse(homeDir).root;
    res.status(200).send({root: root});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/folder', (req: Request, res: Response) => {
  const p = req.body.path;
  const content = fs.readdirSync(p);
  const result = [];

  content.forEach(e => {
    try {
      const stats = fs.statSync(path.join(p, e));
      const type = stats.isDirectory() ? 'folder' : 'file';
      result.push({
        filename: e,
        stats: stats,
        path: path.join(p, e),
        type: type
      });
    } catch (err) {}
  });

  res.status(200).send(result);
});

router.post('/parent', (req: Request, res: Response) => {
  const child = req.body.path;
  let parent;
  const p = path.parse(child);
  if (p.root === child) {
    parent = null;
  } else {
    parent = p.dir;
  }
  res.status(200).send({parent: parent});
});

router.post('/content/', (req: Request, res: Response) => {
  const buffer = fs.readFileSync(req.body.path);
  const content = JSON.stringify(buffer);
  res.status(200).send({content: content});
});

router.post('/file/', (req: Request, res: Response) => {
  exec('\"' + req.body.path + '\"');
  res.status(200).send({});
});

router.post('/copy/', (req: Request, res: Response) => {
  const source = req.body.source;
  const target = `${req.body.target}/${path.basename(source)}`;
  setTimeout(  () => {
    fsextra.copy(source, target)
      .then(() => res.status(200).send({}))
      .catch((error) => res.status(400).send({error: error.message}));
  }, 2500);
});

router.post('/remove', (req: Request, res: Response) => {
  const f = req.body.path;
  setTimeout(() => {
    fsextra.remove(f)
      .then(() => res.status(200).send({}))
      .catch((error) => res.status(400).send({error: error.message}));
  }, 2500);
});



export const MainController: Router = router;
