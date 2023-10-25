import React, { useState } from 'react';
import axios from 'axios';
import {  Outlet, useNavigate } from 'react-router-dom';
import Nav from '../Navigation/nav';
function Status() {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [errors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = {};

    if (!newErrors.email && !newErrors.password && !newErrors.username) {
      axios
        .post('http://localhost:8081/signup', values)
        .then((res) => {
          navigate('/login');
        })
        .catch((err) => {
          console.log(err);
          alert('An error occurred during signup.');
        });
    }
  };

  return (
    <>
     <Nav/>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Track Loan Application Status</strong>
      </div>
      <br />
      <div className='d-flex justify-content-center align-items-center vh-90 SignupPage'>
        <div className='p-1 rounded w-25 signupForm'>
          <form onSubmit={handleSubmit}>

            <div className='mb-3'>
              <input
                type='text'
                id='applicationid'
                placeholder='Enter Application Id'
                name='applicationid'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>

            <div>
              <div className='col'>
                <button type='submit' id='loginButton' className='btn btn-success w-100 rounded-0'>
                  Track
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

export default Status;