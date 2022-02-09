const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amin Khodabande'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
       title: 'About me',
       name: 'Amin Khodabande'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.location) {
        return res.send({
            error: 'You must provide your location'
        })
    }


    const location = req.query.location

    geocode(location, (error, {latitude, longditude, location} = {}) => {

    if(error){
        return res.send({error})
    }

        forecast(latitude, longditude, (error, {temperature, feelslike, description, time} = {}) => {

            if(error){
                return res.send({error})
            }

            res.send({
                location,
                temperature,
                feelslike,        
                description,
                time
            })
        })
    })    

})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'Your must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Amin Khodabande'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error_message: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error_message: 'Page not found.'
    })
})

app.listen(port = 3000, () => {
    console.log('Server is up on port ' + port)
})