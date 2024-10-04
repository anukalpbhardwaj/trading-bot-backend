// utils/mockAPI.js
function getMockStockPrice() {
    // Mock stock price between $90 and $110
    return (Math.random() * 20 + 90).toFixed(2);
  }
  
  module.exports = getMockStockPrice;
  