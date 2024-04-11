const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('./queries')
const { response } = require("express");
const { UPDATE } = require("sequelize/lib/query-types");

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crudapi",
    password: "1234",
    port: "5432",
});
const app = express();

const port = 4000

app.use(bodyParser.json()); // to process

app.use(cors());

app.get('/', (req, res) =>  {
    pool.query(
        "SELECT * FROM students ORDER BY ID DESC", //Query to get all students details from database in descending order
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows);
        }
    );
})

app.get('/student/:id', (req, res) =>  {
    const id = req.params.id;
    pool.query(
        "SELECT * FROM students WHERE ID=$1",[id], //Query to get all students details from database in descending order
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows[0]);
        }
    );
})

// routes to students details page
app.post('/create', db.createUsers); 
app.put('/update/:id', db.updateUsers)
app.delete('/student/:id', db.deleteUsers)

app.listen(port, () => {
    console.log('server is listening.');
}
)