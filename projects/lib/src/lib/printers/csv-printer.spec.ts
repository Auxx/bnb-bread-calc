import { scaldedWheatFormula } from '../../mocks/recipes';
import { baseIngredients } from '../ingredients/ingredients';
import { printToCsv } from './csv-printer';

describe('csv-printer.ts', () => {
  describe('printToCsv', () => {
    it('should work', () => {
      printToCsv(scaldedWheatFormula, 650, true, baseIngredients);
    });
  });
});
