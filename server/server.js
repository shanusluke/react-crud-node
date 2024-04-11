const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
// const db = require('./queries')

const Pool = require("pg").Pool;

// Set up database connection
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crudapi",
    password: "1234",
    port: "5432",
});

const app = express();
const port = 4000

// Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(cors()); // enable CORS

// Route to get all students
app.get('/', (req, res) => {
    pool.query(
        "SELECT * FROM students ORDER BY ID DESC",
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows);
        }
    );
})

// Route to get a specific student
app.get('/student/:id', (req, res) => {
    const id = req.params.id;
    pool.query(
        "SELECT * FROM students WHERE ID=$1", [id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows[0]);
        }
    );
})

// Route to create a new student

app.post('/create', (req, res) => {
    const { name, reg_no, subject, total_mark, grade_status } = req.body;

    //  pool.query is used to execute a query
    pool.query(
        "INSERT INTO students(name, reg_no, subject, total_mark, grade_status) VALUES($1, $2, $3, $4, $5) RETURNING *", //query that inserts a new row into the students table with the name and reg_no values.
        [name, reg_no, subject, total_mark, grade_status],
        (err, results) => {
            //a callback function that is called when the query is complete
            if (err) {
                throw err;
            }
            res.status(201).send(`User added with ID: ${results.rows[0].id}`);
        }
    );
})


// Route to update a student

app.put('/update/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, reg_no, subject, total_mark, grade_status } = req.body;

    pool.query(
        "UPDATE students SET name=$1, reg_no=$2, subject=$3, total_mark=$4, grade_status=$5 WHERE id=$6",
        [name, reg_no, subject, total_mark, grade_status, id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`User details are modified with id ${id}`);
        }
    );
})


// Route to delete a student

app.delete('/student/:id', (req, res) => {
    const id = parseInt(req.params.id); // getting the id  from the request, convert it to integer,

    pool.query(
        "DELETE FROM students WHERE id = $1", // Query to delete a row in the table with id
        [id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`User deleted with id ${id}`);
        }
    );
})


// Start the server
app.listen(port, () => {
    console.log('server is listening.');
})
