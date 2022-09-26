const path = require('path') //core node module 
const express = require('express')
const hbs = require('hbs') //handlebars
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

//holds the express application server, but we must define what to do by route
const app = express();

//special mode variables that 
// console.log(__dirname)
// console.log(__filename)

//define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// for dynamic html sites (oposite to static pages)
// its expects the data lives in the project directory /src in a views folder

//setup handlebars (allows to inject dynamic content into the doc) and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

//use the get to costumize routes 
/*
    first parameter indicates the partial url (section of the webstire we're visiting)
    second a function, with the logical of what to do when someone vist that route

        two parameters: 

            request -> 
            response -> respond to the request, in this case the browser 

*/

//weather app
app.get('/weather', (req,res) => {

    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geoCode.getGeoCode(req.query.address, (error, geoCodeData) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        // calback chaining.. passes the output from geoCode to forecast 
        //important to make sure that if geoCode fails, getForecast will not be call
        forecast.getForecast(geoCodeData.latitude, geoCodeData.longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error: error
                })
            }

            //if everhting went well in both request
            res.send({
                latitude: geoCodeData.latitude,
                longitude: geoCodeData.longitude,
                location: geoCodeData.location,
                forecastData: forecastData,
                address: req.query.address
            })
        })
    })

   
})

app.get('/products', (req,res) => {

    // req has acess to the query string - and through the query string we can implement options as key,value pairs to pass information between the front-end and the backend
    // example, through URL -> http://localhost:3000/products?search=games&ratting=5
    //  "?search=games&ratting=5".. search games in our list of products having a ratting of 5
    // returns an object with each key, value pair as propertie:value
    // example: { search: 'games', ratting: '5' }

    //note: only a send can be sent to a client.. we can not have to send requests inside an handler
    //      we can also place a return on the send error to force the handler to stop execution and not go by the second send method
    console.log(req.query)
    // if a search is not provived 
    if (!req.query.search){
        res.send({
            error: 'You must provied a search tearm'
        })
    }else{

        res.send({
            products:[]
        })
    }
})

//start the server -- 
/*
    a port
    callback function 
*/


//since is not a static html public available, we must handle the route
app.get('', (req,res) => {
    //render allows to render a view and as the second parameters an object with the dynamic values
    res.render('index',{
        title: 'Weather',
        name: 'Guilherme Silva'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Guilherme Silva'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        help_message: 'help me please!',
        title: 'Help',
        name: 'Guilherme'
    })
})

// we can specify for a 404 inside a section for the application
app.get('/help/*', (req,res) => {
    res.render('404', {
        title:404,
        name: 'Guilherme Silva',
        errorMessage: 'Documentation not Found'
    })
})
//handles page not found through the appliation
app.get('*', (req,res) => {
    res.render('404', {
        title: 404,
        name: 'Guilherme Silva',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up, on por 3000')
})