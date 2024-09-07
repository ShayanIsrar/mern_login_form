import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const LogIn = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copyLoginInfo = {...loginInfo};
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo)
    }
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent the form from refreshing the page
        const {email, password} = loginInfo;
        if(!email || !password){
           return handleError('All Fields Are Required')
        }

        try {
            const url = 'mern-login-form-app.vercel.app/auth/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json();
            const {success, message, jwtToken, name, error} = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name)
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details)
            }else if(!success){
                handleError(message);
            }
            console.log(result)
        } catch (error) {
           handleError(error)
        }
    }

  return (
    <div className='container'>
      <h1>LogIn</h1>
      <form action="" onSubmit={handleLogin}>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={handleChange} placeholder='Enter Your Email...' value={loginInfo.email} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={handleChange} placeholder='Enter Your Password...' value={loginInfo.password} />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account? 
        <Link to={'/signup'}>SignUp</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default LogIn
