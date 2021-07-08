if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path')


const axios = require('axios');
const {Pool,Client} = require('pg');

const client = new Client({
    user: process.env.USER,
    host: '127.0.0.1',
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
})
client.connect()

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.get('/', async (req,res) => {
    
    client.query('DELETE FROM rates',(err,res1)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(res1);
        }
    })

    await axios.get('https://api.wazirx.com/api/v2/tickers')
    .then(response =>{
        const result = response.data;
        let count = 0;

        for(let key in result){
            if(count < 10){
                console.log(result[key].name, result[key].last, result[key].buy, result[key].sell, result[key].volume, result[key].base_unit);
                client.query('INSERT INTO rates VALUES($1, $2, $3, $4, $5, $6)', [result[key].name, result[key].last, result[key].buy, result[key].sell, result[key].volume, result[key].base_unit],(err,result1)=>{
                    if(err){
                        console.log(err);
                    }
                });
            }
            else{
                break;
            }
            count += 1;
        }
    })
    .catch(e => {
        console.log(e);
    })


    client.query('SELECT * FROM rates',(err,res1)=>{
        if(err){
            console.log(err);
            return res.send(err);
        }
        let rows = res1.rows
        console.log(rows);
        return res.render('home', {rows});
    })
    
})

app.listen(3000, ()=>{
    console.log('Serving on part 3000');
})