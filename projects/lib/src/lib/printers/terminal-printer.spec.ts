import { scaldedWheatFormula, simpleWheatFormula } from '../../mocks/recipes';
import { printToTerminal } from './terminal-printer';
import { baseIngredients } from '../ingredients/ingredients';

describe('terminal-printer.ts', () => {
  describe('printToTerminal', () => {
    it('should work', () => {
      printToTerminal(scaldedWheatFormula, 650, true, baseIngredients);
    });
  });
});
