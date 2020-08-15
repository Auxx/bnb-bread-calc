# bnb-bread-calc

[![Build Status](https://travis-ci.org/Auxx/bnb-bread-calc.svg?branch=master)](https://travis-ci.org/Auxx/bnb-bread-calc)

TypeScript/JavaScript library to calculate baker's percentages.

`bnb-bread-calc` is using builder pattern heavily as it is designed for streaming data parsers.

## Preferment Stage

Preferments are used in bread production to increase population of yeast and bacteria, as well as
to improve flour properties before mixing the final dough. Most common preferments are sourdough, biga and poolish.
Preferment related functions and data structure are designed specifically for sourdough preferments. Such preferments
require a starter culture, which is usually composed from water and flour. Then additional flour and water are added.
This leads to a situation when such preferments contain two sources of flour and two sources of water, yet only three
ingredients are listed overall.

### PrefermentFormula

Describes a preferment formula. Refer to [PrefermentStageBuilder](#prefermentstagebuilder) for description of fields.

```typescript
export interface PrefermentFormula {
  starterHydration: number;
  outputHydration: number;
  flourRatio: number;
  
  prefermentedAmount?: number;
  flour?: string;
}
```

### PrefermentWeights

Describes preferment main ingredients and their respective ratios.

```typescript
export interface PrefermentWeights {
  starter: number;
  flour: number;
  water: number;
}
```

### PrefermentComposition

Breakdown of a preferment by flour, hydration and relation between all ingredients.

```typescript
export interface PrefermentComposition {
  // Total amount of flour in a preferment
  totalFlour: number;
  // Total amount of water in a preferment
  totalHydration: number;
  
  // Amount of flour in a starter
  starterFlour: number;
  // Amount of water in a starter
  starterHydration: number;

  // Amount of fresh flour
  freshFlour: number;
  // Amount of fresh water
  freshHydration: number;

  // Flour used to create preferment
  flour?: string;
}
```

### PrefermentStageBuilder

Use this builder to create `PrefermentFormula` from streaming data.

#### `constructor(formula: PrefermentFormula = null)`

Creates a new builder, either empty or from existing `PrefermentFormula`.

#### `static start(formula: PrefermentFormula = null): PrefermentStageBuilder`

Same as `constructor`, but in a `static` fashion.

#### `starterHydration(value: number): PrefermentStageBuilder`

Sets initial starter hydration as a decimal number, 1 meaning 100%. Usually starter hydration varies
from 50% (0.5) to 200% (2) with the most common starter hydration being 100% (1).

#### `outputHydration(value: number): PrefermentStageBuilder`

Sets target hydration of a preferment as a decimal number.

#### `flourRatio(value: number): PrefermentStageBuilder`

Sets the ratio between fresh flour to flour in the starter. For example, passing 2 means that there should two times
more fresh flour than is available in the starter.

#### `flour(value: string): PrefermentStageBuilder`

Sets the name/ID of flour used in preferment. If starter and fresh flour are different, use fresh flour name/ID.

#### `prefermentedAmount(value: number): PrefermentStageBuilder`

Sets the amount of flour that should be prefermented in decimal number without unit.

#### `build(): PrefermentFormula`

Returns `PrefermentFormula` based on specified values.

#### Example

```typescript
const prefermentFormula = PrefermentStageBuilder.start()
  .starterHydration(1.5)
  .outputHydration(1)
  .flourRatio(9)
  .build();

// Output
{
  starterHydration: 1.5,
  outputHydration: 1,
  flourRatio: 9,
  prefermentedAmount: 1
}
```

### Preferment stage calculation functions

This is a set of functions to get different information about your preferment composition based on `PrefermentFormula`.

#### `translatePrefermentPercentages(formula: PrefermentFormula): PrefermentFormula`

Translates `PrefermentFormula` specified in percentages (75%) into the same formula using decimal ratios (0.75).
It only affects hydration values.

```typescript
const prefermentFormula = translatePrefermentPercentages({ starterHydration: 150, outputHydration: 100, flourRatio: 2 });

// Output
{
  starterHydration: 1.5,
  outputHydration: 1,
  flourRatio: 2
}
```

#### `translatePrefermentRatios(formula: PrefermentFormula): PrefermentFormula`

Translates `PrefermentFormula` specified in decimal ratios (0.75) into the same formula using percentages (75%).
It is a reverse logic of `translatePrefermentPercentages()` function.

```typescript
const prefermentFormula = translatePrefermentRatios({ starterHydration: 1.5, outputHydration: 1, flourRatio: 2 });

// Output
{
  starterHydration: 150,
  outputHydration: 100,
  flourRatio: 2
}
```

#### `calculatePrefermentWeights(formula: PrefermentFormula, requiredWeight: number): PrefermentWeights`

Calculates weight of ingredients to create a required preferment based on total preferment weight needed.
This is helpful when bulking up sourdough starter, creating levain or converting between different
hydration levels.

```typescript
const result = calculatePrefermentWeights({ starterHydration: 1, outputHydration: 1, flourRatio: 4 }, 90);

// Output

{
  starter: 18,
  flour: 36,
  water: 36
}
```
