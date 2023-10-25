import React, { useState } from 'react';
import axios from 'axios';
import { Link, Outlet, useNavigate } from 'react-router-dom';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const username_pattern = /^[a-zA-Z0-9]{3,}$/; // alpha-numeric character

    let newErrors = {};

    if (!values.email) {
      newErrors.email = 'Email should not be empty';
    } else if (!email_pattern.test(values.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!values.password) {
      newErrors.password = 'Password should not be empty';
    } else if (!password_pattern.test(values.password)) {
      newErrors.password = 'Password must be at least 8 characters long and include special characters, uppercase and lowercase letters, and numbers';
    }

    if (!values.username) {
      newErrors.username = 'Username should not be empty';
    } else if (!username_pattern.test(values.username)) {
      newErrors.username =
        'Username must be at least 3 characters long and can only contain alphanumeric characters';
    }

    setErrors(newErrors);

    // Check if there are any errors before making the signup request
    if (!newErrors.email && !newErrors.password && !newErrors.username) {
      // Send the signup request to your server
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
      <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Register</strong>
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
              <div className='d-flex justify-content-center'>
                <p>Already a user?</p>
              </div>
              <div className='d-flex justify-content-center'>
                <Link to='/login' type='button' id='signupLink' className='btn btn-primary rounded-0'>
                  Login
                </Link>
              </div>
              <Outlet />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;