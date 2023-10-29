const {Client} = require("@googlemaps/google-maps-services-js")
const dotenv = require('dotenv')
const client = new Client({})
dotenv.config()

console.log(process.env)

client
    .findPlaceFromText({
        params: {
            input: '00330626608004',
            inputtype: 'phoneNumber',
            key: process.env.GOOGLE_MAPS_API_KEY
        },
        timeout: 1000, // milliseconds
    })
    .then((r) => {
        console.log('r',r)
        console.log('r data',r.data)
        console.log('r results',r.data.results[0])
        console.log('r elevation',r.data.results[0].elevation)
    })
    .catch((e) => {
        console.error(e)
    })