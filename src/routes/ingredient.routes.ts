import { Router } from 'express';
import {
  actualizar,
  actualizarPrecio,
  agregarPrecio,
  crear,
  eliminar,
  eliminarPrecio,
  listar,
  obtenerPorId,
} from '../controllers/ingredient.controller.js';

const router = Router();

router.get('/', listar);
router.get('/:id', obtenerPorId);
router.post('/', crear);
router.put('/:id', actualizar);
router.delete('/:id', eliminar);

router.post('/:id/precios', agregarPrecio);
router.put('/:id/precios/:precioId', actualizarPrecio);
router.delete('/:id/precios/:precioId', eliminarPrecio);

export default router;
