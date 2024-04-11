import React, { useEffect, useState } from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'

function Student() {


  const [student, setStudent] = useState([]); // state variable to store student data

  // useEffect hook, to fetch the student data
  useEffect(() => {
    axios.get('http://localhost:4000/')
    .then(res => setStudent(res.data)) // Update the student state variable with the fetched data
    .catch(err => console.log(err))
  }, [])

  const handleDelete = async (id) => { // function to handle deleting a student
    try{
      await axios.delete('http://localhost:4000/student/'+id) // Send a DELETE request to the server
      window.location.reload() // Reload the page after the student is deleted

  const [student, setStudent] = useState([])
  useEffect(() => {
    axios.get('http://localhost:4000/')
    .then(res => setStudent(res.data))
    .catch(err => console.log(err))
  }, [])

  const handleDelete = async (id) => {
    try{
      await axios.delete('http://localhost:4000/student/'+id)
      window.location.reload()

    }catch(err){
      console.log(err);
    }
  }

  return (<div className="d-flex vh-100 bg-secondary justify-content-center align-items-center">
    <div className="w-50 h-40 bg-white rounded">
      <h1 className="mt-4 mb-4">Student Details </h1>

      <Link to='/create' className="btn btn-success mt-2 mb-2  ">ADD </Link>
        <table className="table">
          <thead>
            <tr>
            <th>Name</th>
            <th>Roll No.</th>
            <th>Subject</th>
            <th>Total Mark</th>
            <th>Status</th>
            <th>ActionLink</th>
            </tr>
          </thead>
          <tbody>
            {
              student.map((data,i) => (
                <tr key={i}>
                  <td>{data.name}</td>
                  <td>{data.reg_no}</td>
                  <td>{data.subject}</td>
                  <td>{data.total_mark}</td>
                  <td>{data.grade_status}</td>
                  <td>
                    <Link to={`/update/${data.id}`} className="btn btn-primary  mt-2">Update</Link>
                    <button className="btn btn-danger ms-2 mt-2" onClick={e => handleDelete(data.id)}>Delete</button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  </div>);
}

export default Student;
