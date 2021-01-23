export interface ParsedRecipe {
  [key: string]: PartialParsedStage;
}

export interface ParsedStage {
  type: 'preferment' | 'simple' | 'unknown';
  id: string;
  name: string;
  order: number;
  data: { [key: string]: ParsedStageValue[] };
}

export type PartialParsedStage = Partial<ParsedStage>;

export type ParsedStageValue = string | number;

export const temporaryStageKey = '__TEMP__';

export const stageDelimiter = '-';

export const lineDelimiter = /\r?\n/;

export const argumentDelimiter = ':';

export const numericTest = /^\d+$/;

export const percentageTest = /^\d+%$/;

export const stageTypeKey = 'type';

export const stageIdKey = 'id';
