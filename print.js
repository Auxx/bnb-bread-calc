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

printToCsv(formula, 800, true, baseIngredients);
// printToTerminal(formula, 800, true, baseIngredients);
