//@ts-nocheck
import { PerformanceCalculator } from "./PerformanceCalculator";

export class ComedyCalculator extends PerformanceCalculator {
  public performance: any;
  public play: any;

  amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;

    return result;
  }

  volumeCredits() {
    return super.volumeCredits() + Math.floor(this.performance.audience / 5);
  }
}
