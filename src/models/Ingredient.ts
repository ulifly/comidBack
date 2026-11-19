import { Schema, model, type Model, type Types } from 'mongoose';

const UNIDADES = ['gr', 'kg', 'un', 'ml', 'l', 'pz'] as const;

type Unidad = (typeof UNIDADES)[number];

interface PrecioTienda {
  tienda: string;
  precio: number;
  actualizadoEn: Date;
}

interface PrecioTiendaDoc extends PrecioTienda {
  _id: Types.ObjectId;
}

interface Ingredient {
  nombre: string;
  unidad: Unidad;
  stock_actual: number;
  stock_minimo: number;
  precios: Types.DocumentArray<PrecioTiendaDoc>;
  createdAt: Date;
  updatedAt: Date;
}

interface IngredientMethods {
  precioMenor(): PrecioTiendaDoc | null;
}

type IngredientModelType = Model<Ingredient, {}, IngredientMethods>;

const precioTiendaSchema = new Schema<PrecioTienda>(
  {
    tienda: {
      type: String,
      required: [true, 'La tienda es obligatoria'],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    actualizadoEn: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
);

const ingredientSchema = new Schema<Ingredient, IngredientModelType>(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    unidad: {
      type: String,
      required: [true, 'La unidad es obligatoria'],
      enum: UNIDADES,
    },
    stock_actual: {
      type: Number,
      default: 0,
      min: [0, 'El stock actual no puede ser negativo'],
    },
    stock_minimo: {
      type: Number,
      default: 0,
      min: [0, 'El stock mínimo no puede ser negativo'],
    },
    precios: {
      type: [precioTiendaSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    collection: 'ingredients',
  },
);

ingredientSchema.index({ nombre: 1 });

ingredientSchema.methods.precioMenor = function (this: Ingredient): PrecioTiendaDoc | null {
  if (this.precios.length === 0) {
    return null;
  }

  return this.precios.reduce((menor, actual) => (actual.precio < menor.precio ? actual : menor));
};

const IngredientModel = model<Ingredient, IngredientModelType>('Ingredient', ingredientSchema);

export { IngredientModel, UNIDADES, type Ingredient, type PrecioTienda, type PrecioTiendaDoc };
