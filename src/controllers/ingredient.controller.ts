import type { Request, Response } from 'express';
import { IngredientModel } from '../models/index.js';

function noEncontrado(res: Response): void {
  res.status(404).json({ error: 'Ingrediente no encontrado' });
}

export async function listar(_req: Request, res: Response): Promise<void> {
  const ingredients = await IngredientModel.find().sort({ nombre: 1 });
  res.json(ingredients);
}

export async function obtenerPorId(req: Request, res: Response): Promise<void> {
  const ingredient = await IngredientModel.findById(req.params.id);

  if (!ingredient) {
    noEncontrado(res);
    return;
  }

  res.json(ingredient);
}

export async function crear(req: Request, res: Response): Promise<void> {
  const ingredient = await IngredientModel.create(req.body);
  res.status(201).json(ingredient);
}

export async function actualizar(req: Request, res: Response): Promise<void> {
  const ingredient = await IngredientModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!ingredient) {
    noEncontrado(res);
    return;
  }

  res.json(ingredient);
}

export async function eliminar(req: Request, res: Response): Promise<void> {
  const ingredient = await IngredientModel.findByIdAndDelete(req.params.id);

  if (!ingredient) {
    noEncontrado(res);
    return;
  }

  res.status(204).send();
}

export async function agregarPrecio(req: Request, res: Response): Promise<void> {
  const ingredient = await IngredientModel.findById(req.params.id);

  if (!ingredient) {
    noEncontrado(res);
    return;
  }

  ingredient.precios.push(req.body);
  await ingredient.save();
  res.status(201).json(ingredient);
}

export async function actualizarPrecio(req: Request, res: Response): Promise<void> {
  const ingredient = await IngredientModel.findById(req.params.id);

  if (!ingredient) {
    noEncontrado(res);
    return;
  }

  const precio = ingredient.precios.id(String(req.params.precioId));

  if (!precio) {
    res.status(404).json({ error: 'Precio no encontrado en este ingrediente' });
    return;
  }

  if (req.body.tienda !== undefined) {
    precio.tienda = req.body.tienda;
  }

  if (req.body.precio !== undefined) {
    precio.precio = req.body.precio;
  }

  precio.actualizadoEn = new Date();
  await ingredient.save();
  res.json(ingredient);
}

export async function eliminarPrecio(req: Request, res: Response): Promise<void> {
  const ingredient = await IngredientModel.findById(req.params.id);

  if (!ingredient) {
    noEncontrado(res);
    return;
  }

  const precio = ingredient.precios.id(String(req.params.precioId));

  if (!precio) {
    res.status(404).json({ error: 'Precio no encontrado en este ingrediente' });
    return;
  }

  precio.deleteOne();
  await ingredient.save();
  res.json(ingredient);
}
