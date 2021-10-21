const request = require('postman-request')

const geocode = (place, callback) => {
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=pk.eyJ1IjoiYWtzaGF5Z3VnbHkxMjMiLCJhIjoiY2t1c2lpdXRxMTdnZzJ2cDU0Y3h6bjU4aSJ9.7JXVtb5q4qEFZMDtEjdvEQ'

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