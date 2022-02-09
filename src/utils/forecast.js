const request = require('request')

const forecast = (latitude, longditude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=5206d79bfb1b58282587b9f91b0e0147&query=' + latitude + ',' + longditude + '&units=m'

    request({url, json: true}, (error, {body} = {}) => {

        if(error){
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('Unable to find the location.', undefined)
        } else{
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions[0],
                time: body.current.observation_time
            })
        }
    })
}
module.exports = forecast