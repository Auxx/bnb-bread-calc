import { calculateSimpleStageComposition } from './simple-stage';
import { SimpleStageBuilder } from './simple-stage-builder';

describe('simple-stage.ts', () => {
  describe('calculateSimpleStageComposition', () => {
    it('should calculate stage composition', () => {
      const result = calculateSimpleStageComposition(SimpleStageBuilder.start()
        .flour('wheat', 0.7)
        .flour('rye', 0.3)
        .hydration('water', 0.3)
        .hydration('beer', 0.3)
        .other('salt', 0.02)
        .other('cumin', 0.01)
        .build());

      expect(result.flour).toBe(1);
      expect(result.hydration).toBe(0.6);
      expect(result.other).toBe(0.03);
    });
  });
});
