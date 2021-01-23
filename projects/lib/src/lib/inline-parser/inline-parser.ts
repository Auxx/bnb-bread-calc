import {
  argumentDelimiter,
  lineDelimiter,
  numericTest,
  ParsedRecipe,
  ParsedStageValue,
  PartialParsedStage,
  percentageTest,
  stageDelimiter,
  stageIdKey,
  stageTypeKey,
  temporaryStageKey
} from './inline-parser.types';

const log = o => console.log(JSON.stringify(o, null, 2));

export function parseInlineRecipe(recipe: string): ParsedRecipe {
  const lines = recipe
    .split(lineDelimiter)
    .map(line => line.trim())
    .filter(line => line.length > 0);

  const stages = lines
    .reduce(
      lineParser,
      {} as ParsedRecipe);

  delete stages[temporaryStageKey];

  return stages;
}

function lineParser(recipe: ParsedRecipe, line: string, index: number, array: string[]): ParsedRecipe {
  const lastLine = array.length === index + 1;

  if (recipe[temporaryStageKey] === undefined) {
    recipe[temporaryStageKey] = {};
  }

  if (line.startsWith(stageDelimiter)) {
    return createStage(recipe);
  }

  // TODO Add missing logic here
  const args = line
    .split(argumentDelimiter)
    .map(item => item.trim());

  if (args.length === 0) {
    // TODO Add error handling
  }

  const key = args[0];
  const rest = args.slice(1);

  switch (key) {
    case stageTypeKey:
      setStageType(recipe, rest);
      break;

    case stageIdKey:
      setStageId(recipe, rest);
      break;

    default:
      setStageProperty(recipe, key, rest);
      break;
  }

  if (lastLine) {
    return createStage(recipe);
  }

  return recipe;
}

function setStageType(recipe: ParsedRecipe, args: string[]) {
  if (args.length === 0) {
    // TODO Add error handling
  }

  recipe[temporaryStageKey].type = args[0] === 'preferment' || args[0] === 'simple' ? args[0] : 'unknown';
}

function setStageId(recipe: ParsedRecipe, args: string[]) {
  if (args.length === 0) {
    // TODO Add error handling
  }

  recipe[temporaryStageKey].id = args[0];
  recipe[temporaryStageKey].name = args[args.length > 1 ? 1 : 0];
}

function setStageProperty(recipe: ParsedRecipe, key: string, args: string[]) {
  if (recipe[temporaryStageKey].data === undefined) {
    recipe[temporaryStageKey].data = {};
  }

  recipe[temporaryStageKey].data[key] = args.map(getPropertyValue);
}

function getPropertyValue(value: string): ParsedStageValue {
  if (value.length === 0) {
    // TODO Add error handling
  }

  if (numericTest.test(value)) {
    return parseFloat(value);
  }

  if (percentageTest.test(value)) {
    return parseFloat(value.replace('%', '')) / 100;
  }

  return value;
}

function createStage(recipe: ParsedRecipe): ParsedRecipe {
  const stage = recipe[temporaryStageKey];
  stage.order = Object.keys(recipe).length - 1;

  validateParsedStage(stage);

  recipe[stage.id] = stage;
  recipe[temporaryStageKey] = {};

  return recipe;
}

// TODO Implement proper validations and throw an exception on error
function validateParsedStage(stage: PartialParsedStage) {
  return true;
}
