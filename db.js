const {Pool,Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'nodeInternship',
    password: 'aditya491@',
    port: 5432,
})

client.connect()

client.query('SELECT * FROM rates',(err,res)=>{
    console.log(res.rows);
    client.end();
})

// client.query('INSERT INTO rates VALUES($1, $2, $3, $4, $5, $6)', ['BTC',3243324,435324,45234,25323,'BTC/INR'], (err,res)=>{
//     console.log(err, res);
//     client.end();
// });