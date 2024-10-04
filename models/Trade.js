// models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  stockSymbol: String,
  action: String, // "buy" or "sell"
  price: Number,
  quantity: Number,
  profitLoss: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trade', tradeSchema);
