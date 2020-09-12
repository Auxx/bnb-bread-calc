import { RecipeBuilder } from './recipe-builder';
import { SimpleStageBuilder } from '../simple-stage/simple-stage-builder';

describe('RecipeBuilder', () => {
  it('should build recipe', () => {
    const result = RecipeBuilder.start()
      .preferment('levain', { starterHydration: 1.25, outputHydration: 0.8, flourRatio: 9, flour: 'R2500' }, 0.4)

      .simpleStage(
        'scald',
        SimpleStageBuilder.start()
          .flour('R2500', 0.2)
          .hydration('water', 0.4)
          .other('caraway', 0.01)
          .build())

      .simpleStage(
        'dough',
        SimpleStageBuilder.start()
          .flour('R2500', 0.4)
          .hydration('water', 0.2)
          .other('salt', 0.02)
          .build())

      .build();

    expect(result.length).toBe(3);
    expect(result[ 0 ].type).toBe('preferment');
    expect(result[ 1 ].type).toBe('simple');
    expect(result[ 2 ].type).toBe('simple');
  });
});
