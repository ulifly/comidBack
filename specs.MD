vamos a desarrollar una aplicacion web rest de comidas
Logica de negocio:
-la aplicacion guarda el nombre de la comida y los ingredientes que necesita.

-una vez que se agregue un ingrediente nuevo debera quedar guardado en la lista de ingredientes

- al ingresar una nueva comida debera poder seleccionarse el ingredientes de la lista de ingredientes existentes o la opcion agregar nuevo ingrediente

- debera existir un modulo de ingredientes donde se pueda ingresar y actualizar el precio de los ingredientes y agregar las tiendas donde se puede comprar con su respectivo precio

- debere existir un modulo de construccion de menu semanal donde podamos seleccionar las comidaas para cada dia de la semana

- dentro del selector de comidas tambein debe mostrar la opcion de agregar comida nueva

- una vez seleccionado el menu semanal debera agregar los ingredientes y calcular el precio del menu semanal y generar una lista de compras

detalles tecnicos
- Usaremos typescript (avisame las diferencias entre cada paso si usaramos javascript vanilla)

- para el backend, que esta en la carpeta back ya inicialice el proyecto con pnpm y agregue express estoy usando node

- para el frontend, que esta en la carpeta front ya inicialice el proyecto con pnpm y añadi vite con react, usaremos la idea de vite de mobile first para que funcione en el mobil peroq ue este lsito para pc tambien

Recuerda que lo importante es construir por partes y no hagas nada sin que yo lo indique y dame sugerencias de la implementacion 

---

## Decisiones y progreso

- No es e-commerce: no se modelan ordenes ni transacciones. Es una herramienta de ayuda para planificar comidas.
- Autenticacion: JWT (a implementar en un paso posterior).
- Backend en TypeScript con ESM (`NodeNext`). Por eso los imports relativos en `.ts` llevan extension `.js`.
- Paso 1 (hecho): conexion Mongoose en `src/config/db.ts`, carpeta `src/models/` y variables `MONGODB_URI` / `PORT` en `.env`.
- Paso 2 (hecho): modelo `Ingredient` en `src/models/Ingredient.ts`, coleccion `ingredients` con campos `nombre`, `unidad`, `stock_actual`, `stock_minimo`, `precios[]` + `timestamps`.
- `precios[]` es un array de subdocumentos embebidos `{ tienda, precio, actualizadoEn }`, con `_id` propio. Un ingrediente puede tener varios precios segun la tienda.
- Metodo `precioMenor()` del modelo: devuelve la entrada mas barata (o `null` si no hay precios). Se usara al calcular el costo del menu semanal.
- Paso 3 (hecho): CRUD en `src/routes/ingredient.routes.ts` bajo `/api/ingredients`, mas rutas anidadas para precios: `POST /:id/precios`, `PUT /:id/precios/:precioId`, `DELETE /:id/precios/:precioId`. El servidor se inicia con `pnpm dev`.
- Unidades permitidas: `gr`, `kg`, `un`, `ml`, `l`, `pz`.
- Se uso `_id` del subdocumento (no el nombre de tienda) para identificar cada precio, evitando ambiguedad por nombres repetidos o caracteres especiales en la URL.
- Migracion pendiente: queda un documento viejo en MongoDB con los campos eliminados `precio` y `proveedor` (y `precios: []`). No se borro porque son datos del usuario; hace falta migrarlo o eliminarlo.
