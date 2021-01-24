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

export const simpleWheatFormula = `
  type:preferment
  id:sourdough
  flourType:W700
  prefermented:40%
  flourRatio:7
  starterHydration:100%
  outputHydration:80%
  ---
  type:simple
  id:dough:Final dough
  W700:100%:sourdough
  water:65%:sourdough
  stage:sourdough
  salt:2%
`;

export const scaldedWheatFormula = `
  type:preferment
  id:sourdough
  flourType:W1800
  prefermented:10%
  flourRatio:2
  starterHydration:100%
  outputHydration:80%
  ---
  type:simple
  id:scald
  W1800:30%
  water:65%:sourdough
  raw-rye-malt:3%
  ---
  type:simple
  id:sour-scald
  stage:sourdough
  stage:scald
  ---
  type:simple
  id:dough
  stage:sour-scald
  W1800:57%
  salt:2%
`;
