const request = require("request")

const geocode = (address, callback) =>{
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibGFkd29ya3MiLCJhIjoiY2sxZ29lMWhqMDdncDNjcGNleXV2MzllZSJ9.QBN4MqHvgVTfBJgwcNz_lA&limit=1"

  request({ url, json: true}, (error, { body }) => {
    if(error){
      callback("Cannot connect to location service.", undefined)
    } else if(body.features.length === 0){
      callback("Cannot find desired location. Please try again!", undefined)
    } else {
      callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          place: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
