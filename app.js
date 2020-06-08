const express = require('express')
const bodyParser = require('body-parser'); 
const mysql = require('mysql') 

const db = mysql.createConnection({
    host     : '192.168.145.138', 
    user     : 'admin',
    password : 'tbL4BA^{25*T',
    database : 'test'
})

db.connect()
const app = express() 
app.use(bodyParser.json())

app.get('/store',(req,res)=> {   
    let sql = 'SELECT * FROM Store' 
    let query = db.query(sql,(err,results) => { 
        if(err) throw err  
            console.log(results)  
            res.json(results)   
    })
})

app.get('/store/:id',(req,res)=> {
    let sql = 'SELECT * FROM Store WHERE id = ?'
    let storeId = req.params.id
    let query = db.query(sql, [storeId], (err, results) => {
        if(err) throw err
            console.log(results)
            res.json(results)
    })
})

app.post('/store',(req,res)=> {    //add data from body/raw
    let sql = 'INSERT INTO Store SET ?' 
    let storeBody = req.body
    let query = db.query(sql, [storeBody], (err, results) => {
        if(err) throw err
            console.log(results)
            res.json(results)
    })
})

app.put('/store/:id',(req, res) => {    //update data from body/raw
    let sql = "UPDATE Store SET name='"+req.body.name+"', description='"+req.body.description+"', prie='"+req.body.prie+"' WHERE id="+req.params.id
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.listen('3000',() => {
    console.log('start port 3000')  
})
