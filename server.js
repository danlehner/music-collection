const express = require('express')
const app = express() 
const controllers = require('./controllers')
const methodOverride = require('method-override')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const PORT = 3000

app.set('view engine', 'ejs')

// get route for homepage
app.get('/', (req, res) => {

  const context = {
    user: req.session.currentUser
  }

  res.render('index', context)
})

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: "Secretmusicstring", 
  store: new MongoStore({
    url: "mongodb://localhost:27017/music-sessions"
  }), 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

const authRequired = function(req, res, next) {
  if(!req.session.currentUser) {
    return res.redirect("/login")
  }
  next()
}

app.get('/', (req, res) => {
  res.render('index')
})

app.use('/', controllers.auth)

app.use('/collection', authRequired, controllers.collection)

app.use('/album', authRequired, controllers.album)

app.use('/artist', authRequired, controllers.artist)

app.listen(PORT, () => {
  console.log(`Now listening on http://localhost:${PORT}`)
})