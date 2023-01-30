const app = require('./app')
    // const { connectDatabase } = require('./config/database')


app.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`)
})