const express = require('express')
const app = express() 
const controllers = require('./controllers')

const PORT = 3000


app.set('view engine', 'ejs')
// get route for homepage
app.get('/', (req, res) => {
  res.render('index')
})

// post route for homepage redirects to collection 


app.use('/collection', controllers.collection)


app.listen(PORT, () => {
  console.log(`Now listening on http://localhost:${PORT}`)
})