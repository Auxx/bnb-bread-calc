import { ParsedRecipe } from '../inline-parser/inline-parser.types';
import { Ingredient } from '../ingredients/ingredients';
import { calculateRecipeWeights } from '../recipe/recipe';
import { parseInlineRecipe } from '../inline-parser/inline-parser';
import { SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentFormula } from '../preferment-stage/preferment-stage.types';
import { calculatePrefermentWeights } from '../preferment-stage/preferment-stage';

export function printToTerminal(recipe: ParsedRecipe | string,
                                weight: number,
                                weightIsTotal = false,
                                ingredients: Ingredient[]) {
  const result = calculateRecipeWeights(
    typeof recipe === 'string' ? parseInlineRecipe(recipe) : recipe,
    weight,
    weightIsTotal,
    ingredients);

  console.log(`Composition`);
  console.log(`  Flour     : ${ result.totalWeights.flour.toFixed(2) } (${ (result.totalRatios.flour * 100).toFixed(2) }%)`);
  console.log(`  Hydration : ${ result.totalWeights.hydration.toFixed(2) } (${ (result.totalRatios.hydration * 100).toFixed(2) }%)`);
  console.log(`  Other     : ${ result.totalWeights.other.toFixed(2) } (${ (result.totalRatios.other * 100).toFixed(2) }%)`);
  console.log(`  -----------------------------`);
  console.log(`  Total     : ${ result.totalWeight.toFixed(2) } (${ (result.totalPercentage * 100).toFixed(2) }%)`);

  result.sourceFormulas.forEach((formula, index) => {
    console.log(``);

    switch (formula.type) {
      case 'simple':
        printSimpleStage(result.stages[index]);
        break;

      case 'preferment':
        printPrefermentStage(formula.source, result.stages[index]);
        break;
    }
  });
}

function printSimpleStage(stage: SimpleStageFormula) {
  console.log(stage.id);
  stage.flour.forEach(item => console.log(`  ${ item.id.padEnd(20, ' ') } ${ item.totalWeight.toFixed(2).padStart(8) }`));
  stage.hydration.forEach(item => console.log(`  ${ item.id.padEnd(20, ' ') } ${ item.totalWeight.toFixed(2).padStart(8) }`));
  stage.other.forEach(item => console.log(`  ${ item.id.padEnd(20, ' ') } ${ item.totalWeight.toFixed(2).padStart(8) }`));
  stage.stages.forEach(item => console.log(`  ${ item.id.padEnd(20, ' ') } ${ item.totalWeight.toFixed(2).padStart(8) }`));
  console.log(`  -----------------------------`);
  console.log(`  Total                ${ stage.totalWeight.toFixed(2).padStart(8) }`);
}

function printPrefermentStage(formula: PrefermentFormula, stage: SimpleStageFormula) {
  const result = calculatePrefermentWeights(formula, stage.totalWeight);

  console.log(stage.id);
  console.log(`  Starter               ${ result.starter.toFixed(2).padStart(8) }`);
  console.log(`  ${ formula.flour.padEnd(20) }  ${ result.flour.toFixed(2).padStart(8) }`);
  console.log(`  Water                 ${ result.water.toFixed(2).padStart(8) }`);
  console.log(`  -----------------------------`);
  console.log(`  Total                ${ stage.totalWeight.toFixed(2).padStart(8) }`);
}
