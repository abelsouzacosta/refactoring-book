// @ts-nocheck
import { PerformanceCalculator } from "./calculators/PerformanceCalculator";

export let plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

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
