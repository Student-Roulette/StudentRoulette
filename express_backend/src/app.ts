const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Social Coding!')
})

app.listen(port, () => {
  console.log(`App listening at localhost:${port}`)
})
