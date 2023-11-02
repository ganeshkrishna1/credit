import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Navigation/nav';
function Login() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Authentication logic
    const email = values.email;
    const password = values.password;
    if (email === 'admin@gmail.com' && password === 'admin') {
      navigate('/admin');
      return;  
  }
    if (!email) {
      setErrors({ email: 'Email should not be empty' });
    } else if (!password) {
      setErrors({ password: 'Password should not be empty' });
    } else {
      axios
        .post('http://localhost:8081/login', values)
        .then((res) => {
          if (res.data.Status === 'Success') {
            navigate('/admin');
          } else {
            navigate('/signup');
            alert('Invalid Credentials. Please Register.');
          }
        })
        .catch((err) => {
          console.log(err);
          alert('An error occurred during login.');
        });
    }
  };

  return (
    <>
        <Nav/>
      <div className='d-flex justify-content-center align-items-center p-4 w-100 loginHead'>
      </div>
      <br />
      <div className='d-flex justify-content-center align-items-center  loginPage'>
        <div className='p-4 rounded w-25 loginForm'>
          <form onSubmit={handleSubmit}>
            <center>
          <strong>Login</strong>
          </center><br></br>
            <div className='mb-3'>
              <input
                type='text'
                id='email'
                placeholder='Enter Email'
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
            <div className='row'>
              <div className='col-4'>
                <button type='submit' id='loginButton' className='btn btn-success w-100 rounded-0'>
                  Log in
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

export default Login;