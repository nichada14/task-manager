import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';
import taskRoutes from './routes/task.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// Set CORS for Next.js frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://task-manager-s2qj.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));


app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API Running...');
});

export default app;
