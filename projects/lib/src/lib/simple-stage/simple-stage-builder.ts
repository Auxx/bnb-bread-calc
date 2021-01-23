import { SimpleStageBuilderOptions, SimpleStageElement, SimpleStageFormula } from './simple-stage.types';

// TODO Add stage reference support
// TODO Add building from existing SimpleStageFormula
export class SimpleStageBuilder {
  private readonly flourList: SimpleStageElement[] = [];

  private readonly hydrationList: SimpleStageElement[] = [];

  private readonly otherList: SimpleStageElement[] = [];

  private readonly stageList: SimpleStageElement[] = [];

  private stageId: string;

  static start() {
    return new SimpleStageBuilder();
  }

  flour(id: string, ratio: number, options: SimpleStageBuilderOptions = { combineWithExisting: true }) {
    this.addElement(this.flourList, id, ratio, options);
    return this;
  }

  hydration(id: string, ratio: number, options: SimpleStageBuilderOptions = { combineWithExisting: true }) {
    this.addElement(this.hydrationList, id, ratio, options);
    return this;
  }

  other(id: string, ratio: number, options: SimpleStageBuilderOptions = { combineWithExisting: true }) {
    this.addElement(this.otherList, id, ratio, options);
    return this;
  }

  stage(id: string, ratio: number, options: SimpleStageBuilderOptions = { combineWithExisting: true }) {
    this.addElement(this.stageList, id, ratio, options);
    return this;
  }

  id(id: string) {
    this.stageId = id;
    return this;
  }

  build(): SimpleStageFormula {
    return {
      id: this.stageId,
      flour: this.flourList.map(i => ({ ...i })),
      hydration: this.hydrationList.map(i => ({ ...i })),
      other: this.otherList.map(i => ({ ...i })),
      stages: this.stageList.map(i => ({ ...i }))
    };
  }

  private addElement(list: SimpleStageElement[], id: string, ratio: number, options: SimpleStageBuilderOptions) {
    const existing = list.find(i => i.id === id);

    if (existing === undefined) {
      list.push({ id, ratio, subtractFrom: options.subtractFrom });
    } else {
      existing.ratio = options.combineWithExisting ? existing.ratio + ratio : ratio;
    }
  }
}
