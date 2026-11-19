import mongoose from 'mongoose';
import type { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof mongoose.Error.ValidationError) {
    const detalles = Object.values(err.errors).map((error) => error.message);
    res.status(400).json({ error: 'Datos inválidos', detalles });
    return;
  }

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ error: `ID inválido: ${err.value}` });
    return;
  }

  const httpError = err as { status?: number; statusCode?: number; message?: string };
  const status = httpError.status ?? httpError.statusCode;

  if (typeof status === 'number' && status >= 400 && status < 500) {
    res.status(status).json({ error: httpError.message ?? 'Solicitud inválida' });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}
