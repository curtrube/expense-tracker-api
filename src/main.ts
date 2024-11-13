import express from 'express';
import type { Application } from 'express';
import router from './routes/index.js';

const app: Application = express();
const port = 3000;

app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
