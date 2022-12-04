//@ts-nocheck
export class PerformanceCalculator {
  constructor(performance, play) {
    Object.assign(this, { performance, play });
  }

  /**
   * Calculates the amount charged for a performance
   * TODO: replace conditional with polymorphism -> strategy | factory | chain of responsibility
   * @param performance performance object
   */
  amount() {
    let result = 0;
    switch (this.play.type) {
      case "tragedy":
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${performance.play.type}`);
    }

    return result;
  }

  volumeCredits() {
    let result = 0;

    result += Math.max(this.performance.audience - 30, 0);

    if ("comedy" === this.play.type)
      result += Math.floor(this.performance.audience / 5);

    return result;
  }
}
