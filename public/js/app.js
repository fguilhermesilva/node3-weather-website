

console.log('Client side javascript file is loadade')



//document is the index.hbs page, and getting the propertie form - it gives a javascript representation of the object
//this match the first element of type form in the document 
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// note, if we're searching for a class it would be .className.. for ID is #
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//we need an event for when the user adds something to the form
// first parameter is the event, second the function
weatherForm.addEventListener('submit', (e) => {
    //prevents the browser from reloadin
    e.preventDefault()

    //grab the input test value
    const location = search.value

    messageOne.textContent = 'Loading..'
    messageTwo.textContent = ''

    /*
    fetch will kick in an async call, so we don't have the return value right away
    its similar to request, but it as the method then (when it ends) that receive a callback function
    to execute when it ends 

    fetch data from a url and then run a give function 

    then method is call a "promisse" - to be later discussed 
    
    */

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                //console.log(data.error)
                messageOne.textContent = data.error
            }else{
                //console.log(data.location)
                console.log(data.forecastData)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData.resume + ', ' + data.forecastData.temperature + ' degrees.'

            }
            
        })
    })

})
