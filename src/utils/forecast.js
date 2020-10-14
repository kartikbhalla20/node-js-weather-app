// const request = require('request')

// const forecast =(lat, lon, callback)=>{

// const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon=' +lon+ '&units=metric&exclude=hourly,daily&appid=2aa8bb9527bb4404e48f7a0e8e9a840f'

// request({url: url, json: true}, (error, response)=>{

//     if(error){
//         callback('Unable to connect to the location services', undefined)
//     }

//     else if(response.body.error){
//         callback('Unable to find the location', undefined)
//     }

//     else{
//         callback( undefined, {
//                                 temperature : response.body.current.temp,
//                                 timezone: response.body.timezone,
//                                 weather: response.body.current.weather[0].description
//                 })
//         }


//     })

// }

const request = require('request')

const forecast =(lat, lon, callback)=>{

const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +lat+ '&lon=' +lon+ '&units=metric&exclude=hourly,daily&appid=2aa8bb9527bb4404e48f7a0e8e9a840f'

request({ url, json: true}, (error, {body})=>{

    if(error){
        callback('Unable to connect to the location services', undefined)
    }

    else if(body.error){
        callback('Unable to find the location', undefined)
    }

    else{
        callback( undefined, {
                                temperature : body.current.temp,
                                timezone: body.timezone,
                                weather: body.current.weather[0].description
                })
        }


    })

}

module.exports = forecast

