const path = require("path")
const express = require("express")
const hbs = require("hbs")
const request = require("request")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

// Konstanta za path do public foldera putem "path" package-a
const publicPath = path.join(__dirname, "../public")

// Path do partialsa gdje ću držat templejte za header, footer i sl.
const partialsPath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialsPath)

// Definisanje statičke lokacije public patha
app.use(express.static(publicPath))

// Definisanje engina za views - u ovom slučaju je izabran "hbs" package
app.set('view engine', 'hbs')

// path do "templates" foldera koji mijenja "views" folder gdje handlebars traži .hbs fajlove
const viewsPath = path.join(__dirname, "../templates/views")
app.set('views', viewsPath)

app.get('', (req, res) => {
  res.render('index', {
    title: "Vremenska",
    name: "Aladin Landpa"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Page",
    text: "Something about me."
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help Page",
    text: "This is the page you want to visit when in trouble."
  })
})

app.get('/weather', (req, res) => {

  if(!req.query.address){
    return res.send({
      error: "Please enter a valid location to catch the weather!"
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
    if(error){
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, dataForecast) => {
      if(error){
        return res.send({ error })
      }
      res.send({
        place: place,
        forecast: dataForecast
      })
    })
  })

})

app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: "Please enter search term."
    })
  }

  console.log(req.query.search)
  res.send({
    product: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "Error: Could not find article",
    text: "This article could not be found. Please, try again."
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "Error: Page not found!",
    text: "Please check the URL for typos."
  })
})

app.listen(3000, () => {
  console.log("Started me up.")
})
