import { parseInlineRecipe } from './inline-parser';
import { sourRyeFormula } from '../../mocks/recipes';

describe('inline-parser.ts', () => {
  it('should parse formula into object correctly', () => {
    const result = parseInlineRecipe(sourRyeFormula);

    expect(result.sourdough).toBeInstanceOf(Object);
    expect(result.sourdough.type).toBe('preferment');
    expect(result.sourdough.id).toBe('sourdough');
    expect(result.sourdough.name).toBe('sourdough');
    expect(result.sourdough.data).toBeInstanceOf(Object);

    expect(Object.keys(result.sourdough.data).length).toBe(5);
    expect(result.sourdough.data.flourType).toEqual([ 'R2500' ]);
    expect(result.sourdough.data.prefermented).toEqual([ 0.5 ]);
    expect(result.sourdough.data.flourRatio).toEqual([ 2 ]);
    expect(result.sourdough.data.starterHydration).toEqual([ 1 ]);
    expect(result.sourdough.data.outputHydration).toEqual([ 0.8 ]);

    expect(result.dough).toBeInstanceOf(Object);
    expect(result.dough.type).toBe('simple');
    expect(result.dough.id).toBe('dough');
    expect(result.dough.name).toBe('Final dough');
    expect(result.dough.data).toBeInstanceOf(Object);

    expect(Object.keys(result.dough.data).length).toBe(4);
    expect(result.dough.data.R2500).toEqual([ 1, 'sourdough' ]);
    expect(result.dough.data.water).toEqual([ 0.7, 'sourdough' ]);
    expect(result.dough.data.stage).toEqual([ 'sourdough' ]);
    expect(result.dough.data.salt).toEqual([ 0.02 ]);
  });
});
