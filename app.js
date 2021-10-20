const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const app = express()
const restaurantList = require('./restaurant.json')

app.get('/',(req, res) => {

    res.render('index',{ restaurants:restaurantList.results })
}) 

app.get('/search',(req, res) => {

    const keyword = req.query.keyword 
    let restaurants = []
    restaurants = restaurantList.results.filter(restaurant => {
        return restaurant.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
    })

    if (keyword.length === 0) {
        res.render('blank_results')
    }else if (keyword !== restaurantList.name) {
        res.render('no_results',{keyword: keyword})
    }else {
        res.render('index',{ restaurants:restaurants, keyword: keyword })
    }
    
}) 

// app.get('/search',(req, res) => {

//     const keyword = req.query.keyword 
//     const restaurants = restaurantList.results.filter(restaurant => {
//         return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
//     })
//     res.render('index',{ restaurants:restaurants, keyword: keyword })
// })



app.get('/restaurants/:restaurant_id',(req, res) => {

    const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.restaurant_id)
    res.render('show',{ restaurant:restaurant })
}) 

// setting template engine
app.engine('handlebars',exphbs({ defaultLayout: 'main'}))
app.set('view engine','handlebars')

// setting static files
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})
