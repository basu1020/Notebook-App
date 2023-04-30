require("dotenv").config()
const connectToMongo = require("./db")
// connectToMongo()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ greeting: 'Welcome to my API!' })
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  }).catch((err) => {
    console.log("Failed to connect to MongoDb:", err)
  })
})


