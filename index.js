const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const Client = require('node-rest-client').Client

const client = new Client()
const app = express()
const port = 8080
// The id of your deployed application is accessible
// as an envrionment variable
const appID = process.env['APP_ID']

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
   let args = {
       data: {
         "firstname":"Laurent",
         "lastname":"Ruaud",
         "email":"laurent.ruaud@serli.com",
         "id":appID
       },
       headers: { "Content-Type": "application/json" }
   };
   client.post("http://onboarder-jsc.cleverapps.io/play", args, function (data, response) {
     console.log(response);
   });
  
  response.render('home', {
    appID: appID
  })
})
app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})
