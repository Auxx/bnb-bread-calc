import { simpleWheatFormula } from '../../mocks/recipes';
import { printToTerminal } from './terminal-printer';
import { baseIngredients } from '../ingredients/ingredients';

describe('terminal-printer.ts', () => {
  describe('printToTerminal', () => {
    it('should work', () => {
      printToTerminal(simpleWheatFormula, 650, true, baseIngredients);
    });
  });
});
