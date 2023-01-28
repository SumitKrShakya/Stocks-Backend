const express = require('express')
const app = express()
    // https://query1.finance.yahoo.com/v1/finance/search?q=google
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ path: 'config/config.env' })
}


// Using Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
    // app.use(cookieParser())



// Importing Routers
// const post = require('./routes/post')
// const user = require('./routes/user')

// Using Routes
// app.use('/api/v1', post)
// app.use('/api/v1', user)
app.get('/', async(req, res) => {
    const yahooStockAPI = require('yahoo-stock-api').default;

    const yahoo = new yahooStockAPI();

    const startDate = new Date('01/01/2022');
    const endDate = new Date('12/08/2022');

    const response = await yahoo.getHistoricalPrices({ startDate, endDate, symbol: 'AAPL', frequency: '1d' });
    res.json(response)
})

app.get('/test', async(req, res) => {
    const yahooStockAPI = require('yahoo-stock-api').default;

    const yahoo = new yahooStockAPI();

    const response = await yahoo.getSymbol({ symbol: 'AAPL' });
    res.json(response)
})

module.exports = app