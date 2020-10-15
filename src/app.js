const path = require('path') //core module, to link to the public folder, doesnt need to install
const express = require('express') //express is basically a function
const hbs = require('hbs')
const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


//console.log(__filename)
//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()   //we have to call the express function to create a express application and we created a const app variable to store our new express application

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//once hbs installed it is very easy to set up, all we need is to tell express which templating engine is installed by method
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))  //it(app.use) is used to customize your server (in this) to serve out that public folder, express.static is a function that returns its value to app.use,static takes the path

app.get('', (req, res)=>{
    res.render('indexD', {
        title: 'Weather App',
        name: 'Kartik'
    } )
})

app.get('/about', (req, res)=>{
    res.render('aboutD',{
        title: 'About us',
        name: 'Kartik'
    })

})

app.get('/help', (req, res)=>{
    res.render('helpD', {
        title: 'Help',
        name: 'Kartik',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            Error: 'Address must be provided to get the weather'
        })
    }

    
            geocode(req.query.address, (error, data = {})=>{
        
                if(error){
                   return res.send({
                        Error: error
                    }) 
                } 
                
                forecast(data.latitude, data.longitude, (error, fData)=>{
                    if(error){
                        return res.send({
                            Error: error
                        })
                    }
                        // console.log('Location: ' +data.location)
                        // console.log('Data: ', fData)
                        res.send({ 
                              Location: data.location,
                              Address: req.query.address,
                              Data: fData,
                               
                        })
                
                })
            })
      

    // res.send({
    //     forecast : 'It is snowing',
    //     location: 'Philadelphia',
    //     temperature: 33.4,
    //     address: req.query.address
    // })

})

app.get('/help/*', (req, res)=>{
    res.render('error', {
        title: 'Error 404',
        name: 'Help article doesn"t exist'
    })
})

app.get('*', (req, res)=>{
    res.render('error', {
        title: 'Error 404',
        name: 'Page not found'
    })
})




// app.get('', (req, res)=>{      //this app.get tells wht server should do when someone tries to get the resource at specific url to return the html data or json data
//                                 // app.get has 2 arguments 1st is route(partial) 2nd is function which decides what should do(response) when request arrives

//         res.send('Hello Express')
// }) 

/***TASKS***/
//app.com
//app.com/help
//app.com/about
//app.com/weather

/****Challenge 1 */

// app.get('/help', (req, res)=>{
//     res.send('Help Page')
// })

// app.get('/about', (req, res)=>{
// res.send('About Page')
// })

// app.get('/weather', (req, res)=>{
// res.send('Weather conditions')
// })

/****Challenge 2 */

// app.get('', (req, res)=>{ 
//     res.send('<h1>Weather</h1>')
// }) 

// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Kartik',
//         age: 22
//     })
// })

// app.get('/about', (req, res)=>{
// res.send('<h2>About Page</h2>')
// })

// app.get('/weather', (req, res)=>{
// res.send({
//     location: 'Philadelphia',
//     temperature: 33.4
// })
// })

app.listen(port, ()=>{                        //this method is to start the server, arguments are (Port number, callback function)
    console.log('Server is up on port ' +port)    //not displayable to user, only for confirm that server is running successfully
})

