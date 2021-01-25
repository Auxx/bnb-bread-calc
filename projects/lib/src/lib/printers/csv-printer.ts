import { ParsedRecipe } from '../inline-parser/inline-parser.types';
import { Ingredient } from '../ingredients/ingredients';
import { calculateRecipeWeights } from '../recipe/recipe';
import { parseInlineRecipe } from '../inline-parser/inline-parser';
import { SimpleStageFormula } from '../simple-stage/simple-stage.types';
import { PrefermentFormula } from '../preferment-stage/preferment-stage.types';
import { calculatePrefermentWeights } from '../preferment-stage/preferment-stage';

export function printToCsv(recipe: ParsedRecipe | string,
                           weight: number,
                           weightIsTotal = false,
                           ingredients: Ingredient[]) {
  const result = calculateRecipeWeights(
    typeof recipe === 'string' ? parseInlineRecipe(recipe) : recipe,
    weight,
    weightIsTotal,
    ingredients);

  const rows = [];

  rows.push([ 'Composition' ]);
  rows.push([ 'Flour', result.totalWeights.flour, `${ (result.totalRatios.flour * 100).toFixed(2) }%` ]);
  rows.push([ 'Hydration', result.totalWeights.hydration, `${ (result.totalRatios.hydration * 100).toFixed(2) }%` ]);
  rows.push([ 'Other', result.totalWeights.other, `${ (result.totalRatios.other * 100).toFixed(2) }%` ]);
  rows.push([ 'Total', result.totalWeight, `${ (result.totalPercentage * 100).toFixed(2) }%` ]);

  result.sourceFormulas.forEach((formula, index) => {
    rows.push([ '' ]);

    switch (formula.type) {
      case 'simple':
        printSimpleStage(result.stages[index], rows);
        break;

      case 'preferment':
        printPrefermentStage(formula.source, result.stages[index], rows);
        break;
    }
  });

  const columnCount = rows.reduce((acc, row) => Math.max(acc, row.length), 0);

  console.log(rows.map(row => printRow(row, columnCount)).join(`\n`));
}

function printSimpleStage(stage: SimpleStageFormula, rows: any[]) {
  rows.push([ stage.id ]);
  stage.flour.forEach(item => rows.push([ item.id, item.totalWeight ]));
  stage.hydration.forEach(item => rows.push([ item.id, item.totalWeight ]));
  stage.other.forEach(item => rows.push([ item.id, item.totalWeight ]));
  stage.stages.forEach(item => rows.push([ item.id, item.totalWeight ]));
  rows.push([ 'Total', stage.totalWeight ]);
}

function printPrefermentStage(formula: PrefermentFormula, stage: SimpleStageFormula, rows: any[]) {
  const result = calculatePrefermentWeights(formula, stage.totalWeight);

  rows.push([ stage.id ]);
  rows.push([ 'Starter', result.starter ]);
  rows.push([ formula.flour, result.flour ]);
  rows.push([ 'Water', result.water ]);
  rows.push([ 'Total', stage.totalWeight ]);
}

function printRow(row: any[], columns: number) {
  const result = [];

  for (let i = 0; i < columns; i++) {
    result.push(i < row.length ? prepareValue(row[i]) : '');
  }

  return result.join(',');
}

function prepareValue(value: any) {
  const valueType = typeof value;
  const result = typeof value === 'number' ? value.toFixed(2) : value.toString();

  return result.match(/[,"]/) !== null ? `"${ result.replace(/"/g, '""') }"` : result;
}
