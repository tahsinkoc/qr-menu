const express = require('express')
const cors = require('cors');

const app = express();
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'menu',
    password: 'Postgres',
    dialect: 'postgres',
    port: 5432
});

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})


app.get('/categories', (req, res, next) => {
    pool.query('select * from categories')
        .then(result => {
            res.send(result.rows)
        })
})
app.get('/products', (req, res, next) => {
    pool.query('select * from products')
        .then(result => {
            res.send(result.rows)
        })
})

app.post('/post-category', (req, res) => {
    let data = req.body
    let dataArray = []
    data.map((item) => {
        pool.query('insert into categories (c_name) VALUES($1)', [item.cat]).catch(err => console.log(err))
    })
})

app.post('/post-product', (req, res) => {
    let data = req.body
    // let dataArray = []
    data.map((item) => {
        pool.query('insert into products (cat_id, c_name, price, c_details) VALUES($1, $2, $3, $4)', [item.catId, item.cat, item.price, item.details]).catch(err => console.log(err))
    })
})

app.post('/delete-category', (req, res) => {
    let data = req.body
    pool.query('DELETE FROM categories WHERE id = $1', [data.id]).catch(err => console.log(err))
    pool.query('DELETE FROM products WHERE cat_id = $1', [data.id]).catch(err => console.log(err))
})
app.post('/delete-product', (req, res) => {
    let data = req.body
    pool.query('DELETE FROM products WHERE id = $1', [data.id]).catch(err => console.log(err))
})


const server = app.listen(4575, () => {
    let host = server.address().address
    let port = server.address().port
})
