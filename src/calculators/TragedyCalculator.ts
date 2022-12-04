//@ts-nocheck
import { PerformanceCalculator } from "./PerformanceCalculator";

export class TragedyCalculator extends PerformanceCalculator {
  public performance: any;
  public play: any;

  amount() {
    let result = 40000;

    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }

    return result;
  }
}
