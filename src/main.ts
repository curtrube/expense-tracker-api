import express from 'express';
import type { Application } from 'express';
import api from './api/routes/index.js';

const app: Application = express();
const port = 3000;

app.use('/api', api);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
