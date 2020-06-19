import { SimpleStageElement, SimpleStageFormula } from './simple-stage.types';

// TODO Add stage reference support
export class SimpleStageBuilder {
  private readonly flourList: SimpleStageElement[] = [];

  private readonly hydrationList: SimpleStageElement[] = [];

  private readonly otherList: SimpleStageElement[] = [];

  static start() {
    return new SimpleStageBuilder();
  }

  flour(id: string, ratio: number, combineOrReplace = true) {
    this.addElement(this.flourList, id, ratio, combineOrReplace);
    return this;
  }

  hydration(id: string, ratio: number, combineOrReplace = true) {
    this.addElement(this.hydrationList, id, ratio, combineOrReplace);
    return this;
  }

  other(id: string, ratio: number, combineOrReplace = true) {
    this.addElement(this.otherList, id, ratio, combineOrReplace);
    return this;
  }

  build(): SimpleStageFormula {
    return {
      flour: this.flourList.map(i => ({ ...i })),
      hydration: this.hydrationList.map(i => ({ ...i })),
      other: this.otherList.map(i => ({ ...i }))
    };
  }

  private addElement(list: SimpleStageElement[], id: string, ratio: number, combineOrReplace: boolean) {
    const existing = list.find(i => i.id === id);

    if (existing === undefined) {
      list.push({ id, ratio });
    } else {
      existing.ratio = combineOrReplace ? existing.ratio + ratio : ratio;
    }
  }
}
