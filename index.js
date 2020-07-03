const express=require('express');
const app=express();
const readline= require('readline-sync');
const fs= require('fs');

var obj={
    count:0,
    coordinates:[],
}

var h0=parseFloat(readline.question("enter initial height: "));
var e=parseFloat(readline.question("enter coefficient of restitution(less than 1): "));

var t0= Math.sqrt(2*h0/9.8)
var count=0;

var time=t0;
var newHeight=h0;

while(newHeight)
{
    count++;
    obj.coordinates.push({height:newHeight,time:time});

    newHeight=Math.pow(e,2*count)*h0;
    time=2*t0*Math.pow(e,count);
}

obj.count=count;
var data= JSON.stringify(obj,null,2);

fs.writeFileSync('values.json',data,(err)=>{
    if(err)
    {
        throw(err);
    }
})

app.get('/',(req,res)=>{
    fs.readFile('values.json',(err,data)=>{
        if(err)
        throw err;
        values=JSON.parse(data);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.send(values);
    })
})

app.listen(3000);
console.log("server running at port 3000");