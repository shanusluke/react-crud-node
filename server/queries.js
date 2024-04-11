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

// CRUD operations with postgresql db

// code to Insert data in to the database
const createUsers = (req, res) => {
    const { name, reg_no,subject, total_mark, grade_status } = req.body;

    //  pool.query is used to execute a query
    pool.query(
        "INSERT INTO students(name, reg_no, subject, total_mark, grade_status) VALUES($1, $2, $3, $4, $5) RETURNING *", //query that inserts a new row into the students table with the name and reg_no values.
        [name, reg_no,subject, total_mark, grade_status],
        (err, results) => {
            //a callback function that is called when the query is complete
            if (err) {
                throw err;
            }
            res.status(201).send(`User added with ID: ${results.rows[0].id}`);
        }
    );
};

// code to Read data from the database

const getUsers = (req, res) => {
    pool.query(
        "SELECT * FROM students ORDER BY ID DESC", //Query to get all students details from database in descending order
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).json(results.rows);
        }
    );
};

// to update user details in the database

const updateUsers = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, reg_no,subject, total_mark, grade_status } = req.body;

    pool.query(
        "UPDATE students SET name=$1, reg_no=$2, subject=$3, total_mark=$4, grade_status=$5 WHERE id=$6",
        [name, reg_no,subject, total_mark, grade_status, id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`User details are modified with id ${id}`);
        }
    );
};

// code to delete data from the database

const deleteUsers = (req, res) => {
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
};

// exporting an object that contains two methods: createUsers and getUsers
// this allows us to import these methods in other js files
module.exports = {
    createUsers,
    getUsers,
    updateUsers,
    deleteUsers,
};
