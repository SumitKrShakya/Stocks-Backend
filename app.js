const express = require('express')
const cors = require('cors');
const axios = require('axios')
const yahooStockAPI = require('yahoo-stock-api').default;

const yahoo = new yahooStockAPI();


const app = express()
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));
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
    console.log('request at /')

    const startDate = new Date('12/01/2022');
    const endDate = new Date('01/01/2023');

    const response = await yahoo.getHistoricalPrices({ startDate, endDate, symbol: 'AAPL', frequency: '1d' });
    res.json(response)
})
app.get('/test', async(req, res) => {


    const response = await yahoo.getSymbol({ symbol: 'AAPL' });
    res.json(response)
})

app.post(`/search`, async(req, res) => {
    const data = req.body;
    console.log(req.body.inputText)
    const response = await axios.get(`https://query1.finance.yahoo.com/v1/finance/search?q=${data.inputText}`)
    res.json(response.data)
})

app.post(`/chart/data`, async(req, res) => {
    const data = req.body;
    console.log(req.body)
    const dt = new Date();
    dt.setDate(dt.getDate() - 7);
    const date = ("0" + dt.getDate()).slice(-2);
    const month = ("0" + (dt.getMonth() + 1)).slice(-2);
    const year = dt.getFullYear();
    const today = month + "/" + date + "/" + year;
    const prevdt = new Date();
    prevdt.setDate(prevdt.getDate() - 7);

    if (req.body.range === "1w") {
        prevdt.setDate(prevdt.getDate() - 7);
        const prevDate = ("0" + prevdt.getDate()).slice(-2);
        const prevMonth = ("0" + (prevdt.getMonth() + 1)).slice(-2);
        const prevYear = prevdt.getFullYear();
        const stDate = prevMonth + "/" + prevDate + "/" + prevYear;
        const startDate = new Date(stDate);
        console.log(today, stDate)
        const endDate = new Date(today);
        const response = await yahoo.getHistoricalPrices({ startDate, endDate, symbol: req.body.symbol, frequency: '1d' });
        res.json(response)
    } else if (req.body.range === "5y") {
        // prevdt.setMonth(prevdt.getMonth() - ((52 * 5) + 2));
        prevdt.setFullYear(prevdt.getFullYear() - 5);
        const prevDate = ("0" + prevdt.getDate()).slice(-2);
        const prevMonth = ("0" + (prevdt.getMonth() + 1)).slice(-2);
        const prevYear = prevdt.getFullYear();
        const stDate = prevMonth + "/" + prevDate + "/" + prevYear;
        const startDate = new Date(stDate);
        console.log(today, stDate)
        const endDate = new Date(today);
        const response = await yahoo.getHistoricalPrices({ startDate, endDate, symbol: req.body.symbol, frequency: '1mo' });
        console.log(response.response.length)
        res.json(response)
    } else if (req.body.range === "1y") {
        prevdt.setMonth(prevdt.getMonth() - (52 + 2));
        const prevDate = ("0" + prevdt.getDate()).slice(-2);
        const prevMonth = ("0" + (prevdt.getMonth() + 1)).slice(-2);
        const prevYear = prevdt.getFullYear();
        const stDate = prevMonth + "/" + prevDate + "/" + prevYear;
        const startDate = new Date(stDate);
        console.log(today, stDate)
        const endDate = new Date(today);
        const response = await yahoo.getHistoricalPrices({ startDate, endDate, symbol: req.body.symbol, frequency: '1d' });
        res.json(response)
    } else {
        prevdt.setMonth(prevdt.getMonth() - 2);
        const prevDate = ("0" + prevdt.getDate()).slice(-2);
        const prevMonth = ("0" + (prevdt.getMonth() + 1)).slice(-2);
        const prevYear = prevdt.getFullYear();
        const stDate = prevMonth + "/" + prevDate + "/" + prevYear;
        const startDate = new Date(stDate);
        console.log(today, stDate)
        const endDate = new Date(today);
        const response = await yahoo.getHistoricalPrices({ startDate, endDate, symbol: req.body.symbol, frequency: '1d' });
        res.json(response)
    }
})

app.post(`/chart/info`, async(req, res) => {
    const data = req.body;
    console.log(req.body)
    const response = await yahoo.getSymbol({ symbol: data.symbol });
    // console.log(response)
    res.json(response)
})

module.exports = app