// @ts-nocheck
import { createStatementData } from "./createStatement";

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
  return renderPlainText(createStatementData(invoice));
}

function usd(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let performance of data.performances) {
    result += `${performance.play.name}: ${usd(performance.amount / 100)} (${
      performance.audience
    } seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount / 100)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

console.log(statement(invoices[0]));
