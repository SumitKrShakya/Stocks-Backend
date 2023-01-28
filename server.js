const app = require('./app')
const cors = require('cors');
// const { connectDatabase } = require('./config/database')


// connectDatabase()

app.use(cors({
    origin: ['http://localhost:3000',
        '*'
    ]
}));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})