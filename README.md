# Trading Bot Backend

This backend application simulates a basic trading bot using Node.js, Express, and MongoDB.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a `.env` file with the following content:

4. Run the server: `npm start`.

## Endpoints

- **GET /api/trades/run**: Evaluates a trade based on mock stock prices.
- **GET /api/trades/summary**: Provides a summary report of all trades.

## Trading Strategy

- **Buy**: When the stock price drops to or below $98.
- **Sell**: When the stock price rises by 3% above the average buy price.

## Running the Application

The trading bot runs every 5 seconds and evaluates whether to buy or sell based on the mock stock price.
