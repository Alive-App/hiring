const express = require('express')
const mongoose = require('mongoose')
const routes = require('./src/routes')
const app = express()
const cors = require('cors')

app.use(express.json())
mongoose.connect(`mongodb+srv://development_tests:04091999@omnistack.frk0z.mongodb.net/test-hiring?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DATABASE connected')
}).catch(() => {
    console.log('Error to connect database')
})
app.use(cors())
app.use(routes)


app.listen(3333, () => {
    console.log('server is running on port 3333')
})