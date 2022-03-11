const http = require('http')
const express =require('express')
const bodyParser= require('body-parser')
const adminRoute = require("./routes/beneficiaryRoute");

const app=express();

/* * Middleware for parsing request bodies 
   * doesnt support JSON or files when extended is false
   * set to true to parse JSON
*/
app.use(bodyParser.urlencoded({extended:true}))

// A Must to parse JSON payloads 
app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    // seems to be allowing GET and POST by default
    res.setHeader('Access-Control-Allow-Methods','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    next()
})

app.use(adminRoute);

// app.get('/favicon.ico',(req,res,next)=>{
//     res.sendStatus(204);
// })

// app.use('/file',(req,res,next)=>{
//     console.log(req.body)
//     res.send(`<html><h2>File Page</h2></html>`)
// })

// app.use('/',(req,res,next)=>{
//     // res.setHeader('Content-Type','application/json')
//     res.json(array)
// })

/* Vanilla approach for creating server */
// const server = http.createServer((req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   // res.write(`<html><h2>Qotoof</h2></html>`)
//   res.write(JSON.stringify(array));
//   res.end();
// });
// const server = http.createServer(app);
// server.listen(4000)


app.listen(8000)
