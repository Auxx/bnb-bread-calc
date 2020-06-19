import { PrefermentsBuilder } from './preferments-builder';

describe('PrefermentsBuilder', () => {
  it('should build pre-ferment formula', () => {
    const result = PrefermentsBuilder.start()
      .starterHydration(1.5)
      .outputHydration(1)
      .flourRatio(9)
      .build();

    expect(result.starterHydration).toBe(1.5);
    expect(result.outputHydration).toBe(1);
    expect(result.flourRatio).toBe(9);
    expect(result.flour).toBeUndefined();
  });

  it('should replace same values', () => {
    const result = PrefermentsBuilder.start()
      .flour('wheat')
      .starterHydration(1.5)
      .outputHydration(1)
      .starterHydration(2)
      .flourRatio(9)
      .flourRatio(5)
      .outputHydration(0.8)
      .flour('rye')
      .build();

    expect(result.starterHydration).toBe(2);
    expect(result.outputHydration).toBe(0.8);
    expect(result.flourRatio).toBe(5);
    expect(result.flour).toBe('rye');
  });
});
