import React, { useState } from 'react';
import axios from 'axios';
import {  Outlet, useNavigate } from 'react-router-dom';
import Nav from '../Navigation/nav';
function Home() {
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
                id='username'
                placeholder='Enter Username'
                name='username'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.username && <span className='text-danger'>{errors.username}</span>}
            </div>

            <div className='mb-3'>
              <input
                type='email'
                id='email'
                placeholder='Enter email'
                name='email'
                onChange={handleInput}
                className='form-control rounded-0'
                autoComplete='off'
              />
              {errors.email && <span className='text-danger'>{errors.email}</span>}
            </div>

            <div className='mb-3'>
              <input
                type='password'
                id='password'
                placeholder='Enter Password'
                name='password'
                onChange={handleInput}
                className='form-control rounded-0'
              />
              {errors.password && <span className='text-danger'>{errors.password}</span>}
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