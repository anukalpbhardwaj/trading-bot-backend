// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const tradeRoutes = require('./routes/tradeRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => console.log(error));

app.use('/api/trades', tradeRoutes);

const { evaluateTrade } = require('./services/tradingService');

// Run the trading logic every 5 seconds
setInterval(evaluateTrade, 4000);
