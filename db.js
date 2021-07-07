const {Pool,Client} = require('pg');

const client = new Client({
    user: 'xxxxx',
    host: xxxxx,
    database: 'xxxxxx',
    password: 'xxxxxxx',
    port: xxxx,
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
