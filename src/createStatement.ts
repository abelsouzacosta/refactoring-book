// @ts-nocheck
export let plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

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

export function createStatementData(invoice) {
  let statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = getTotalAmount(statementData);
  statementData.totalVolumeCredits = getTotalVolumeCredits(statementData);

  function enrichPerformance(performance) {
    let calculator = new PerformanceCalculator(
      performance,
      playFrom(performance)
    );
    let result = Object.assign({}, performance);

    result.play = calculator.play;
    result.amount = calculator.amount();
    result.volumeCredits = calculator.volumeCredits();

    return result;
  }

  return statementData;
}

function playFrom(performance) {
  return plays[performance.playID];
}

function getTotalVolumeCredits(invoice) {
  return invoice.performances.reduce(
    (total, performance) => total + performance.volumeCredits,
    0
  );
}

function getTotalAmount(invoice) {
  return invoice.performances.reduce(
    (total, performance) => total + performance.amount,
    0
  );
}
