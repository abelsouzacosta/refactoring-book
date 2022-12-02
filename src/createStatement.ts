// @ts-nocheck
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
    let result = Object.assign({}, performance);

    result.play = playFrom(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsForPerformance(result);

    return result;
  }

  return statementData;
}

function playFrom(performance) {
  return plays[performance.playID];
}

/**
 * Calculates the amount charged for a performance
 * TODO: replace conditional with polymorphism -> strategy | factory | chain of responsibility
 * @param performance performance object
 */
function amountFor(performance) {
  let result = 0;
  switch (performance.play.type) {
    case "tragedy":
      result = 40000;
      if (performance.audience > 30) {
        result += 1000 * (performance.audience - 30);
      }
      break;
    case "comedy":
      result = 30000;
      if (performance.audience > 20) {
        result += 10000 + 500 * (performance.audience - 20);
      }
      result += 300 * performance.audience;
      break;
    default:
      throw new Error(`unknown type: ${performance.play.type}`);
  }

  return result;
}

function volumeCreditsForPerformance(performance) {
  let result = 0;

  result += Math.max(performance.audience - 30, 0);

  if ("comedy" === performance.play.type)
    result += Math.floor(performance.audience / 5);

  return result;
}

/**
 * Calculates total volume credits for a customer
 * TODO: replace loop for pipeline
 * @param invoice invoice object
 */
function getTotalVolumeCredits(invoice) {
  let result = 0;

  for (let performance of invoice.performances) {
    result += performance.volumeCredits;
  }

  return result;
}

/**
 * Calculates total amount of a invoice
 * @param invoice invoice object
 *  */
function getTotalAmount(invoice) {
  let result = 0;

  for (let performance of invoice.performances) {
    result += performance.amount;
  }

  return result;
}
