const express = require('express')
const app = express() 
const controllers = require('./controllers')
const methodOverride = require('method-override')

const PORT = 3000


app.set('view engine', 'ejs')

// get route for homepage
app.get('/', (req, res) => {
  res.render('index')
})

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// post route for homepage redirects to collection 

app.use('/collection', controllers.collection)

app.use('/album', controllers.album)

app.use('/artist', controllers.artist)

app.listen(PORT, () => {
  console.log(`Now listening on http://localhost:${PORT}`)
})