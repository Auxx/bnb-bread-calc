export const sourRyeFormula = `
  type:preferment
  id:sourdough

  flourType:R2500
  prefermented:50%
  flourRatio:2
  starterHydration:100%
  outputHydration:80%

  ---

  type:simple
  id:dough:Final dough

  R2500:100%:sourdough
  water:70%:sourdough
  stage:sourdough
  salt:2%
  `;
