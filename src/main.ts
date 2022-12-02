// @ts-nocheck
export let plays = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

export let invoices = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

export function statement(invoice) {
  let statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;

  return renderPlainText(statementData);

  function playFrom(performance) {
    return plays[performance.playID];
  }

  function amountFor(performance) {
    let result = 0;
    switch (playFrom(performance).type) {
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
        throw new Error(`unknown type: ${playFrom(performance).type}`);
    }

    return result;
  }

  function volumeCreditsForPerformance(performance) {
    let result = 0;

    result += Math.max(performance.audience - 30, 0);

    if ("comedy" === playFrom(performance).type)
      result += Math.floor(performance.audience / 5);

    return result;
  }

  function usd(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  function getTotalVolumeCredits(invoice) {
    let result = 0;

    for (let performance of invoice.performances) {
      result += volumeCreditsForPerformance(performance);
    }

    return result;
  }

  function getTotalAmount(invoice) {
    let result = 0;

    for (let performance of invoice.performances) {
      result += amountFor(performance);
    }

    return result;
  }

  function renderPlainText(data) {
    let result = `Statement for ${data.customer}\n`;

    for (let performance of data.performances) {
      result += `${playFrom(performance).name}: ${usd(
        amountFor(performance) / 100
      )} (${performance.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(getTotalAmount(data) / 100)}\n`;
    result += `You earned ${getTotalVolumeCredits(data)} credits\n`;
    return result;
  }
}

console.log(statement(invoices[0]));
