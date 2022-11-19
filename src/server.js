const http=require('http')
const express =require('express');
const app = express();
var data=require('./customer.json')
var cors =require('cors')
const bodyParser=require('body-parser');
app.use(cors())
app.use(bodyParser.json())

//all record

app.get('/api/customers',(req,res)=>{
    return res.json({result : data,count:data.length})
} )
// console.log(data)
//insert

app.post('/api/customers',(req,res)=>{
    console.log('server start insert',req.body.value)
     data.splice(0,0,req.body.value);
    return res.status(200).send('row inserted') 
})

//remove 

app.delete('/api/customers/:id',(req,res)=>{
     console.log('server start delete',req.body);
 data= data.filter((x) => x.CustomerID != req.body.key);
return res.status(200).send('row deleted') })

//update
app.put('/api/customers/:id',(req,res)=>{
    console.log('server start update',req.body.value);
    var index =data.findIndex((x)=>x.CustomerID === req.body.value.CustomerID);
    console.log(index)
     data.splice(index ,1,req.body.value);
return res.status(200).send('row update') })


app.listen(8080,(err)=> {if (err) console.log(err); console.log("port 8")})