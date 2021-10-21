const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

// app.com
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akshay'
    })
})

// app.com/about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Akshay'
    })
})

// app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Akshay',
        helpText: 'This is the help page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide as address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(port, () => {
    console.log('Server started correctly on port ' + port)
})