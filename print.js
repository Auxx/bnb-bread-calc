const { printToTerminal, printToCsv, baseIngredients } = require('./dist/lib');

const formula = `
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

const bunFormula = `
  type:preferment
  id:sourdough
  flourType:W550
  prefermented:50%
  flourRatio:7
  starterHydration:100%
  outputHydration:70%
  ---
  type:simple
  id:predough
  stage:sourdough
  W550:45%
  water:15%
  salt:1.5%
  ---
  type:simple
  id:dough
  stage:predough
  W550:5%
  butter:6%
  sugar:15%
`;

const pizzaFormula = `
  type:preferment
  id:sourdough
  flourType:W700
  prefermented:40%
  flourRatio:7
  starterHydration:100%
  outputHydration:80%
  ---
  type:simple
  id:dough
  stage:sourdough
  W700:100%:sourdough
  water:75%:sourdough
  olive-oil: 2%
  salt:2%
`;

const wwRyeFormula = `
  type:preferment
  id:sourdough
  flourType:R2000
  prefermented:40%
  flourRatio:7
  starterHydration:100%
  outputHydration:80%
  ---
  type:simple
  id:dough
  stage:sourdough
  W1800:50%
  R2000:50%:sourdough
  water:70%:sourdough
  coriander:0.5%
  salt:2%
`;

printToCsv(wwRyeFormula, 600, true, baseIngredients);
// printToTerminal(wwRyeFormula, 600, true, baseIngredients);
