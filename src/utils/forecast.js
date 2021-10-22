const request = require('postman-request')

const forecast = (latitude, longitude, weatherApiKey, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=' + weatherApiKey + '&query=' + latitude + ',' + longitude + '&units=f'

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback({error: 'Unable to connect to weather service'}, undefined)
        }else if(response.body.error){
            callback({error: 'Unable to find location'}, undefined)
        }else{
            callback(undefined, 'Current temperature is ' + response.body.current.temperature + 'f Feels like ' + response.body.current.feelslike +'f')
        }
    })
}

module.exports = forecast