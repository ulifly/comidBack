import mongoose from 'mongoose';

export async function connectDB(uri: string): Promise<typeof mongoose> {
  if (!uri) {
    throw new Error('MONGODB_URI no está definida en el archivo .env');
  }

  mongoose.set('strictQuery', true);

  return mongoose.connect(uri);
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
}
