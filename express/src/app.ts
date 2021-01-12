import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
