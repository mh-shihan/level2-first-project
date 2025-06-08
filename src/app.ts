import express, { Request, Response } from 'express';
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
const app = express();

// Parser
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', StudentRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
