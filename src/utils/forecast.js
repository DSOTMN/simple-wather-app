const request = require("request")

const forecast = (lat, long, callback) => {
  const url = "https://api.darksky.net/forecast/8170a26684833b1adf62848fec4fbe33/" + lat + "," + long + "?units=si&lang=bs"

  request({url, json: true}, (error, { body }) => {
    if(error){
      callback("Cannot connect to the weather service!", undefined)
    } else if(body.error){
      callback("Unable to fetch valid location. Please try another one.", undefined)
    } else{
      callback(undefined, body.daily.data[0].summary + " Trenutna temperatura iznosi " + body.currently.temperature + " stepeni Celzijusa. Šansa za padavine je " + body.currently.precipProbability + "%.")
    }
  })
}

module.exports = forecast
