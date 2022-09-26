const request = require('postman-request')

const getForecast = (latitude, longitude, callback) => {
    
    // prepare url with parameters to token 
    const url = 'http://api.weatherstack.com/current?access_key=f6f625e8f9b9c8e0fa613515d9032473&query=' + longitude + ',' + latitude + '&units=m'
    //make the request 
    // request returns a response object and since we're only using the body properti let's discontruct the object
    request({url: url, json:true}, (error, {body}) => {
        //code protect
        if (error){
            callback('unable to connect to weather service!!', undefined)
        }else if (body.error){
            callback('unable to connect to weather service!!', undefined)
        }else{
            callback(undefined, {
                resume: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })

}

module.exports = {
    getForecast: getForecast
}