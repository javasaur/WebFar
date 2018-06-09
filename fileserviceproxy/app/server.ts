import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import {MainController} from './controllers';

const app: express.Application = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', MainController);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
