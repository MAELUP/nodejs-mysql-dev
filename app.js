const express = require('express') 
const mysql = require('mysql') 

const db = mysql.createConnection({
    host     : '192.168.145.138', 
    user     : 'admin',
    password : 'tbL4BA^{25*T',
    database : 'test'
})

db.connect()
const app = express() 

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



app.listen('3000',() => {
    console.log('start port 3000')  
})
