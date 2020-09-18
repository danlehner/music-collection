const express = require('express')
const app = express() 
const controllers = require('./controllers')

const PORT = 3000

// get route for homepage
app.get('/', (req, res) => {
  res.send('This is the homepage')
})

app.use('/controllers', controllers.collection)


// post route for homepage redirects to collection 

app.listen(PORT, () => {
  console.log(`Now listening on http://localhost:${PORT}`)
})