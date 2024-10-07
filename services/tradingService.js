// services/tradingService.js

let currentBalance = 10000; // Starting balance
let stockPosition = 0; // Number of stocks currently held by the trader
const initialBalance = currentBalance; // Initial balance before trading begins
const stopLossPercentage = 0.05; // Stop-loss percentage to prevent large losses

// Function to generate a mock stock price between $100 and $200
function getMockStockPrice() {
  // Generates a random price between $100 and $200 (Math.random() generates a number between 0 and 1)
  return (Math.random() * 100 + 100).toFixed(2);
}

// Function to evaluate whether to buy or sell stocks based on current stock price
function evaluateTrade() {
  // Get the current mock stock price as a floating-point number
  const stockPrice = parseFloat(getMockStockPrice());
  console.log(`Current stock price: $${stockPrice}`);

  // Buy condition: Buy stocks if the price drops by 2% (to $98 or below) and no stocks are currently held
  if (stockPrice <= 98 && stockPosition === 0) {
    stockPosition = Math.floor(currentBalance / stockPrice); // Buy as many stocks as possible
    currentBalance -= stockPosition * stockPrice; // Update balance after buying stocks
    console.log(`Bought ${stockPosition} stocks at $${stockPrice}`);
  } 
  // Sell condition: Sell stocks if the price rises by 3% (to $103 or above) and stocks are held
  else if (stockPrice >= 103 && stockPosition > 0) {
    currentBalance += stockPosition * stockPrice; // Update balance after selling stocks
    console.log(`Sold ${stockPosition} stocks at $${stockPrice}`);
    stockPosition = 0; // Reset stock position to zero after selling
  }

  // Check for stop-loss condition: If the current balance falls below a certain threshold, exit all positions
  if (currentBalance <= initialBalance * (1 - stopLossPercentage)) {
    console.log("Stop-loss triggered! Exiting all positions to avoid further losses.");
    stockPosition = 0; // Set stock position to zero
  }

  // Log the current balance after each trade
  console.log(`Current balance: $${currentBalance}`);
}

// Function to run multiple trades over time (simulates trading rounds)
function startTradingSimulation(rounds, intervalMs) {
  let round = 0; // Keep track of the current round

  const tradingInterval = setInterval(() => {
    if (round < rounds) {
      console.log(`\nTrade round ${round + 1}`); // Log the current trade round
      evaluateTrade(); // Evaluate whether to buy or sell in this round
      round++; // Move to the next round
    } else {
      clearInterval(tradingInterval); // Stop the simulation after all rounds are complete
      console.log("\nTrading simulation completed.");
      console.log(`Final balance: $${currentBalance}`); // Log the final balance after simulation
    }
  }, intervalMs);
}

// Start a simulation with 10 rounds, updating the stock price every 2 seconds
startTradingSimulation(10, 2000);

// Export functions for use in other modules (like importing into the main app)
module.exports = {
  evaluateTrade,
  startTradingSimulation,
};
