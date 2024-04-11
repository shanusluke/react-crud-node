import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CreateStudent() {

    const [name,setName] = useState('')
    const [reg_no,setRegno] = useState('')
    const [subject,setSubject] = useState('')
    const [total_mark,setTotalMark] = useState('')
    const [grade_status,setGradeStatus] = useState('')
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:4000/create',{name, reg_no,subject, total_mark, grade_status})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err =>console.log(err));
    }

  return (
    <div className=' d-flex vh-100 bg-secondary justify-content-center align-items-center'>
        <div className=' container-fluid w-60 bg-light rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h1>Add Student Details</h1>
  <div class="row mb-3">
    <label for="inputName" class="col-sm-2 col-form-label">Name</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" 
      onChange={e => setName(e.target.value)} id="inputName"/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputrollno" class="col-sm-2 col-form-label">Roll.No</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputrollno"
      onChange={e => setRegno(e.target.value)}/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputsubject" class="col-sm-2 col-form-label">Subject</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="inputsubject" 
      onChange={e => setSubject(e.target.value)}/>
    </div>
  </div>
  <div class="row mb-3">
    <label for="inputtotal" class="col-sm-2 col-form-label">Total Mark</label>
    <div class="col-sm-10">
      <input type="number" class="form-control" id="inputtotal"
      onChange={e => setTotalMark(e.target.value)}/>
    </div>
  </div>
<div className='row mb-3'>
<label for="inputstatus" class="col-sm-2 col-form-label">Status</label>

<div class="col-sm-5">
<select class="form-select" aria-label="Default select example" 
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
  
  <button type="submit" class="btn btn-primary">ADD</button>
  <button type="button" className="ms-2 btn btn-secondary" onClick={() => navigate('/')}>CANCEL</button>

</form>
        </div>
    </div>
  )
}

export default CreateStudent