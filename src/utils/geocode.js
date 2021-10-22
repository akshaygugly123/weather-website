const request = require('postman-request')

const geocode = (place, mapboxApiKey, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=' + mapboxApiKey

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to Geocoding service')
        } else if(!response.body.features || response.body.features.length == 0){
            callback('Unable to find the location try again with different search term')
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode