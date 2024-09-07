import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const SignUp = () => {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        const copySignupInfo = {...signupInfo};
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo)
    }
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();  // Prevent the form from refreshing the page
        const {name, email, password} = signupInfo;
        if(!name || !email || !password){
           return handleError('All Fields Are Required')
        }

        try {
            const url = 'mern-login-form-app.vercel.app/auth/signup';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result = await response.json();
            const {success, message, error} = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
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
      <h1>SignUp</h1>
      <form action="" onSubmit={handleSignup}>
        <div>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' onChange={handleChange} autoFocus placeholder='Enter Your Name...' value={signupInfo.name} />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={handleChange} placeholder='Enter Your Email...' value={signupInfo.email} />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" name='password' onChange={handleChange} placeholder='Enter Your Password...' value={signupInfo.password} />
        </div>
        <button type='submit'>Signup</button>
        <span>Already have an account? 
        <Link to={'/login'}>Login</Link>
        </span>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default SignUp
