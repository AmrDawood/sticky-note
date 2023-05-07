import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; 
export default function Login() {

  const [user, setUser] = useState({email:'',password:''});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  
  async function signIn(e){
    e.preventDefault();
    setIsLoading(true);
    // console.table(user);
    // const response =await axios.post(`https://sticky-note-fe.vercel.app/signin`,user);
    // console.log(response.data);
    // console.log(response.data.message);
    const {data} =await axios.post(`https://sticky-note-fe.vercel.app/signin`,user);
    //  console.table(data);
    setIsLoading(false);
    if (data.message === 'success'){
      localStorage.setItem('token',data.token);
      navigate('/home');
    }else{
     // console.table(data.message);
      setError(data.message);
    }

  }
  
  function getUserLogInData(e){
    setUser({...user , [e.target.name]:e.target.value});
    // console.log(user);
  }

  return (
    <>
    <div className="container">
        <div className=" row justify-content-center align-items-center vh-100">
          
        <form onSubmit={signIn} className="w-75">
        <h3 className='display-1 text-center'>Log In</h3>           
            <div className="row">
            <div className="col-12 form-floating">
                <input onChange={getUserLogInData}
                type="email"
                className="form-control ps-2 "
                id="email" name='email'
                placeholder="test@gmail.com"
             />
             <label htmlFor="email" className="form-label  ms-2">Email</label>
             </div>
            </div>

            <div className="row my-3">
            <div className="col-12 form-floating">
                <input onChange={getUserLogInData}
                type="password"
                className="form-control ps-2"
                id="password" name='password'
                placeholder="password at least 3 char"
                />
                <label htmlFor="password" className="form-label ms-2">password</label>
            </div>                
            </div>

            <div className="col-12">
              <button  type="submit" className={"btn btn-primary w-100 py-3 text-white " + (isLoading ? "disabled" : "" )}> { isLoading ? <i className="fa fa-2xl fa-spinner fa-spin " aria-hidden="true" style={{color: "#ffffff",}}></i>
                : " Sign In  "} </button>
            </div>
            { error ? <div className="alert alert-danger mt-2">
              {error}
            </div> : "" }
        </form>
        </div>
    
    </div>
   
   
    </>
  )
}
