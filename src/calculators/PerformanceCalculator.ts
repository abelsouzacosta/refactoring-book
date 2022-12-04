//@ts-nocheck
export class PerformanceCalculator {
  public performance: any;
  public play: any;

  constructor(performance, play) {
    Object.assign(this, { performance, play });
  }

  /**
   * Calculates the amount charged for a performance
   * TODO: replace conditional with polymorphism -> strategy | factory | chain of responsibility
   * @param performance performance object
   */
  amount() {
    throw new Error("Subclass responsibility");
  }

  volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}
