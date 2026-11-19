import express from 'express';
import { errorHandler } from './middlewares/error.js';
import ingredientRoutes from './routes/ingredient.routes.js';

const app = express();

app.use(express.json());

app.use('/api/ingredients', ingredientRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use(errorHandler);

export default app;
