const expect = require("chai").expect;
const sinon = require("sinon");

const Stock = require("../models/stock");
const StockController = require("../controllers/stock");

describe("Stock Controller - getRecentQuote", function () {
  it("should throw an error with code 500 if accessing the database", function () {
    sinon.stub(Stock, "findOne");
    Stock.findOne.throws();

    expect(StockController.getRecentQuote);

    Stock.findOne.restore();
  });
});
