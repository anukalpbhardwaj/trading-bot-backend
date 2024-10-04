// services/tradingService.js
const Trade = require('../models/Trade');
const getMockStockPrice = require('../utils/mockAPI');

let currentBalance = 10000; // Starting balance
let stockPosition = 0;
let averageBuyPrice = 0;

async function evaluateTrade() {
  const stockPrice = parseFloat(getMockStockPrice());
  console.log(`Current stock price: $${stockPrice}`);

  if (stockPrice <= 98 && stockPosition === 0) {
    // Buy condition: price drops by 2% from $100
    stockPosition = Math.floor(currentBalance / stockPrice);
    averageBuyPrice = stockPrice;
    currentBalance -= stockPosition * stockPrice;

    await Trade.create({
      stockSymbol: 'MOCK',
      action: 'buy',
      price: stockPrice,
      quantity: stockPosition,
      profitLoss: 0,
    });

    console.log(`Bought ${stockPosition} stocks at $${stockPrice}`);
  } else if (stockPrice >= averageBuyPrice * 1.03 && stockPosition > 0) {
    // Sell condition: price rises by 3% from the average buy price
    const profitLoss = stockPosition * (stockPrice - averageBuyPrice);
    currentBalance += stockPosition * stockPrice;

    await Trade.create({
      stockSymbol: 'MOCK',
      action: 'sell',
      price: stockPrice,
      quantity: stockPosition,
      profitLoss,
    });

    console.log(`Sold ${stockPosition} stocks at $${stockPrice}`);
    stockPosition = 0;
  }

  console.log(`Current balance: $${currentBalance}`);
}

module.exports = {
  evaluateTrade,
};
