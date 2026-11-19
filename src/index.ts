import 'dotenv/config';
import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = Number(process.env.PORT ?? 3000);

async function main(): Promise<void> {
  await connectDB(process.env.MONGODB_URI ?? '');
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

main().catch((error: unknown) => {
  console.error('No se pudo iniciar el servidor:', error);
  process.exit(1);
});
