import React, { useState } from 'react';
import axios from 'axios';
import {  Outlet, useNavigate } from 'react-router-dom';
import Nav from '../Navigation/nav';
function Home() {
  const [values, setValues] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    occupation: '',
    income: '',
    payslip1:'',
    payslip2:'',
  });
  const [files, setFiles] = useState({
    payslip1: null,
    payslip2: null,
});


const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFiles(prev => ({ ...prev, [name]: files[0] }));
};

  const navigate = useNavigate();

  const [errors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = {};

    if (!newErrors.email && !newErrors.password && !newErrors.username) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
    });

    Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
    });
      axios
        .post('http://localhost:8081/application', formData)
        .then((res) => {
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
          alert('An error occurred .');
        });
    }
  };

  return (
    <>
     <Nav/>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Apply for Loan</strong>
      </div>
      <br />
      <div className='d-flex justify-content-center align-items-center vh-90 SignupPage'>
        <div className='p-1 rounded w-25 signupForm'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input
                type='text'
                id='name'
                required
                placeholder='Enter name'
                name='name'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.name && <span className='text-danger'>{errors.name}</span>}
            </div>

            <div className='mb-3'>
              <input
                type='text'
                id='dob'
                required
                placeholder='Enter dob [dd/mm/yyyy]'
                name='dob'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.username && <span className='text-danger'>{errors.username}</span>}
            </div>

            <div className='mb-3'>
              <input
                type='text'
                required
                id='phone'
                placeholder='Enter Phone number'
                name='phone'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>
            <div className='mb-3'>
              <input
                type='email'
                required
                id='email'
                placeholder='Enter email Id'
                name='email'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>

            <div className='mb-3'>
              <input
                type='occupation'
                required
                id='occupation'
                placeholder='Enter occupation'
                name='occupation'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <div className='mb-3'>
              <input
                type='income'
                required
                id='income'
                placeholder='Enter income per month'
                name='income'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
            </div>
            <div className='mb-3'>
              <label>Upload Payslip1 / Income Proof</label>
    <input 
        type='file' 
        required
        id='payslip1' 
        accept=".pdf" 
        onChange={handleFileChange} 
        name='payslip1' 
        className='form-control rounded-0'
    />
    {errors.payslip1 && <span className='text-danger'>{errors.payslip1}</span>}
</div>
<div className='mb-3'>
<label>Upload Payslip 2 </label>
    <input 
        type='file' 
        id='payslip2' 
        accept=".pdf" 
        onChange={handleFileChange} 
        name='payslip2' 
        className='form-control rounded-0'
    />
    {errors.payslip2 && <span className='text-danger'>{errors.payslip2}</span>}
</div>

            <div>
              <div className='col'>
                <button type='submit' id='loginButton' className='btn btn-success w-100 rounded-0'>
                  Submit
                </button>
              </div>
    
              <Outlet />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;