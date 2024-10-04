// routes/tradeRoutes.js
const express = require('express');
const { evaluateTrade } = require('../services/tradingService');

const router = express.Router();

// Route to evaluate trading based on mock stock price
router.get('/run', (req, res) => {
  try {
    evaluateTrade();
    res.status(200).send('Trade evaluated');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get a summary report of all trades
router.get('/summary', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.status(200).json(trades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
