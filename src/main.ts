import express from 'express';
import type { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;

app.get('/', (_: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
