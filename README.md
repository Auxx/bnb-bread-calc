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
