const request = require('postman-request')

const getGeoCode = (address, callback) => {

    //encondeURIComponents handles special caracters locations
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmd1aWxoZXJtZXNpbHZhIiwiYSI6ImNsOGQzYmxlcDByeGIzb21yM2JlOGgzdzIifQ.i8teVzc2MyBGhFKX4IpjsA&limit=1'

    // we can handle the 
    request({url: url, json:true}, (error, {body}) => {
        if (error){
            // if assync request fails, it passes the error message to the callback function
            callback('unable to connect to geolocation service!!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find the latitude and longitude of the given location', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }) 

}

module.exports = {
    getGeoCode: getGeoCode
}