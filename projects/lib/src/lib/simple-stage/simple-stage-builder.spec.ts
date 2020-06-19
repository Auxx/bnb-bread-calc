import { SimpleStageBuilder } from './simple-stage-builder';

describe('SimpleStageBuilder', () => {
  it('should combine similar elements', () => {
    const result = SimpleStageBuilder.start()
      .flour('r2500', 0.7)
      .hydration('water', 0.5)
      .other('cumin', 0.01)
      .hydration('darkbeer', 0.1)
      .hydration('darkbeer', 0.1)
      .flour('r2500', 0.3)
      .other('salt', 0.02)
      .other('cumin', 0.01)
      .build();

    expect(result.flour.length).toBe(1);
    expect(result.hydration.length).toBe(2);
    expect(result.other.length).toBe(2);

    expect(result.flour[0].id).toBe('r2500');
    expect(result.flour[0].ratio).toBe(1);

    expect(result.hydration[0].id).toBe('water');
    expect(result.hydration[0].ratio).toBe(0.5);
    expect(result.hydration[1].id).toBe('darkbeer');
    expect(result.hydration[1].ratio).toBe(0.2);

    expect(result.other[0].id).toBe('cumin');
    expect(result.other[0].ratio).toBe(0.02);
    expect(result.other[1].id).toBe('salt');
    expect(result.other[1].ratio).toBe(0.02);
  });

  it('should replace similar elements', () => {
    const result = SimpleStageBuilder.start()
      .flour('r2500', 0.7, false)
      .hydration('water', 0.5, false)
      .other('cumin', 0.01, false)
      .hydration('darkbeer', 0.1, false)
      .hydration('darkbeer', 0.1, false)
      .flour('r2500', 0.3, false)
      .other('salt', 0.02, false)
      .other('cumin', 0.01, false)
      .build();

    expect(result.flour.length).toBe(1);
    expect(result.hydration.length).toBe(2);
    expect(result.other.length).toBe(2);

    expect(result.flour[0].id).toBe('r2500');
    expect(result.flour[0].ratio).toBe(0.3);

    expect(result.hydration[0].id).toBe('water');
    expect(result.hydration[0].ratio).toBe(0.5);
    expect(result.hydration[1].id).toBe('darkbeer');
    expect(result.hydration[1].ratio).toBe(0.1);

    expect(result.other[0].id).toBe('cumin');
    expect(result.other[0].ratio).toBe(0.01);
    expect(result.other[1].id).toBe('salt');
    expect(result.other[1].ratio).toBe(0.02);
  });
});
