export interface Ingredient {
  id: string;
  type: IngredientType;

  name?: string;
  meta?: string;
  description?: string;
}

export enum IngredientType {
  flour = 'flour',
  hydration = 'hydration',
  other = 'other',
  stage = 'stage',
  combined = 'combined' // TODO Add support
}

export const baseIngredients: Ingredient[] = [
  // Stage ingredient, allows to add dough development stages as ingredients
  { id: 'stage', type: IngredientType.stage },

  // Combined ingredient, allows to add starters as ingredients
  { id: 'starter', name: 'Starter', type: IngredientType.combined },

  // Wheat flour
  { id: 'W405', type: IngredientType.flour, name: 'Pastry flour', meta: 'Wheat' },
  { id: 'W550', type: IngredientType.flour, name: 'Plain flour', meta: 'Wheat' },
  { id: 'W700', type: IngredientType.flour, name: 'Bread flour', meta: 'Wheat' },
  { id: 'W700X', type: IngredientType.flour, name: 'American Bread flour', meta: 'Wheat' },
  { id: 'W812', type: IngredientType.flour, meta: 'Wheat' },
  { id: 'W1050', type: IngredientType.flour, meta: 'Wheat' },
  { id: 'W1200', type: IngredientType.flour, meta: 'Wheat' },
  { id: 'W1600', type: IngredientType.flour, meta: 'Wheat' },
  { id: 'W1800', type: IngredientType.flour, name: 'Whole grain flour', meta: 'Wheat' },

  // Rye flour
  { id: 'R610', type: IngredientType.flour, name: 'Pastry rye flour', meta: 'Rye' },
  { id: 'R815', type: IngredientType.flour, name: 'White rye flour', meta: 'Rye' },
  { id: 'R997', type: IngredientType.flour, name: 'Light rye flour', meta: 'Rye' },
  { id: 'R1150', type: IngredientType.flour, meta: 'Rye' },
  { id: 'R1370', type: IngredientType.flour, name: 'Medium rye flour', meta: 'Rye' },
  { id: 'R1740', type: IngredientType.flour, name: 'Dark rye flour', meta: 'Rye' },
  { id: 'R2000', type: IngredientType.flour, name: 'Whole grain rye flour', meta: 'Rye' },
  { id: 'R2500', type: IngredientType.flour, name: 'Bran enriched rye flour', meta: 'Rye' },

  // Malts
  { id: 'raw-rye-malt', type: IngredientType.flour, name: 'Raw rye malt', meta: 'Rye' },
  { id: 'roasted-rye-malt', type: IngredientType.flour, name: 'Roasted rye malt', meta: 'Rye' },
  { id: 'fermented-rye-malt', type: IngredientType.flour, name: 'Fermented rye malt', meta: 'Rye' },
  { id: 'diastatic-malt', type: IngredientType.flour, name: 'Diastatic malt', meta: 'Barley' },

  // Hydration
  { id: 'water', type: IngredientType.hydration, name: 'Water' },
  { id: 'beer', type: IngredientType.hydration, name: 'Beer' },
  { id: 'cider', type: IngredientType.hydration, name: 'Cider' },
  { id: 'vinegar', type: IngredientType.hydration, name: 'Vinegar' },
  { id: 'milk', type: IngredientType.hydration, name: 'Milk' },
  { id: 'kefir', type: IngredientType.hydration, name: 'Kefir' },
  { id: 'yogurt', type: IngredientType.hydration, name: 'Yogurt' },

  // Other
  { id: 'salt', type: IngredientType.other, name: 'Salt' },
  { id: 'caraway', type: IngredientType.other, name: 'Caraway seeds' },
  { id: 'cumin', type: IngredientType.other, name: 'Cumin seeds' },
  { id: 'fennel', type: IngredientType.other, name: 'Fennel seeds' },
  { id: 'anise', type: IngredientType.other, name: 'Anise seeds' },
  { id: 'coriander', type: IngredientType.other, name: 'Coriander seeds' },
  { id: 'pumpkin-seeds', type: IngredientType.other, name: 'Pumpkin seeds' },
  { id: 'sunflower-seeds', type: IngredientType.other, name: 'Sunflower seeds' },
  { id: 'oil', type: IngredientType.other, name: 'Oil', meta: 'Any' },
  { id: 'veg-oil', type: IngredientType.other, name: 'Vegetable oil' },
  { id: 'olive-oil', type: IngredientType.other, name: 'Olive oil' },
  { id: 'butter', type: IngredientType.other, name: 'Butter' },
  { id: 'sugar', type: IngredientType.other, name: 'Sugar' },
  { id: 'treacle', type: IngredientType.other, name: 'Black treacle' },
  { id: 'eggs', type: IngredientType.other, name: 'Eggs' },
  { id: 'baking-powder', type: IngredientType.other, name: 'Baking powder' },
  { id: 'cinnamon', type: IngredientType.other, name: 'Cinnamon' }
];
