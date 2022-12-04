import { statement, invoices } from "../src/main";

describe("statement", () => {
  it("Should return response with valid arguments given", () => {
    let result = statement(invoices[0]);

    let phrase =
      "Statement for BigCo\n" +
      "Hamlet: $650.00 (55 seats)\n" +
      "As You Like It: $580.00 (35 seats)\n" +
      "Othello: $500.00 (40 seats)\n" +
      "Amount owed is $1,730.00\n" +
      "You earned 47 credits\n";

    expect(result).toEqual(phrase);
  });
});
