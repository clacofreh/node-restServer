const express = require('express');
const app = express()
require('./config/config')

const bodyParser = require('body-parser');
const { request } = require('express');

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.get('/usuario', (req,res)=>{

    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
            ok:false,
            mensaje:'El nombre es necesario'
        })
    }
    else{
        res.json({
            body
        })   
    }
  
} )

app.post('/usuario', (req,res)=>{
    res.json('post usuario')
} )
app.put('/usuario', (req,res)=>{
    res.json('put usuario')
} )
app.delete('/usuario', (req,res)=>{
    res.json('delete usuario')
} )

app.listen(process.env.PORT,()=>{
    console.log('Escuchando puerto', 3000)
})