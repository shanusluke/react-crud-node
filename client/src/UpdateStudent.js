import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

function UpdateStudent() {



    const {id} = useParams(); //get the student id from the url parameters

    // Define state variables for the student details
=======
    const {id} = useParams();

    const [name,setName] = useState('')
    const [reg_no,setRegno] = useState('')
    const [subject,setSubject] = useState('')
    const [total_mark,setTotalMark] = useState('')
    const [grade_status,setGradeStatus] = useState('')


    const navigate = useNavigate(); // navigate function from react-router

    // Use the useEffect hook to fetch the current student details
    useEffect(() => {
      axios.get('http://localhost:4000/student/'+id)
      .then(res => {
        // Update the state variables with the fetched student details

    const navigate = useNavigate();

    useEffect(() => {
      axios.get('http://localhost:4000/student/'+id)
      .then(res => {

          setName(res.data.name);
          setRegno(res.data.reg_no);
          setSubject(res.data.subject);
          setTotalMark(res.data.total_mark);
          setGradeStatus(res.data.grade_status);
      }).catch(err =>console.log(err));
  }, [id]);


  // function to be called when the form is submitted
    function handleSubmit(event) {
        event.preventDefault();
        // Send a PUT request to the server to update the student details
        axios.put('http://localhost:4000/update/'+id,{id, name, reg_no,subject, total_mark, grade_status})
        .then(res => {
            console.log(res);
            navigate('/');  // Navigate back to the home page after the student details are updated

    function handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:4000/update/'+id,{id, name, reg_no,subject, total_mark, grade_status})
        .then(res => {
            console.log(res);
            navigate('/');

        }).catch(err =>console.log(err));
    }

  return (
    <div className=' d-flex vh-100 bg-secondary justify-content-center align-items-center'>
        <div className=' container-fluid w-60 bg-light rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h1>Update Student Details</h1>
  <div className="row mb-3">
    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" 
      onChange={e => setName(e.target.value)} id="inputName" value={name}/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputrollno" className="col-sm-2 col-form-label">Roll.No</label>
    <div className="col-sm-10">
      <input type="number" className="form-control" id="inputrollno" value={reg_no}
      onChange={e => setRegno(e.target.value)}/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputsubject" className="col-sm-2 col-form-label">Subject</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="inputsubject" value={subject}
      onChange={e => setSubject(e.target.value)}/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="inputtotal" className="col-sm-2 col-form-label">Total Mark</label>
    <div className="col-sm-10">
      <input type="number" className="form-control" id="inputtotal" value={total_mark}
      onChange={e => setTotalMark(e.target.value)}/>
    </div>
  </div>
<div className='row mb-3'>
<label htmlFor="inputstatus" className="col-sm-2 col-form-label">Status</label>

<div className="col-sm-5">
<select className="form-select" aria-label="Default select example" id='inputstatus' value={grade_status}
onChange={e => {
    setGradeStatus(e.target.value)
    console.log(e.target.value)
}
}>
  <option selected>Select Status</option>
  <option value="Failed">Failed</option>
  <option value="Passed">Passed</option>
</select>
</div>
</div>
  
  <button type="submit" className="btn btn-primary">UPDATE</button>
  <button type="button" className="ms-2 btn btn-secondary" onClick={() => navigate('/')}>CANCEL</button>
</form>
        </div>
    </div>
  )
}

export default UpdateStudent