import React, { useState } from 'react'
import axios from 'axios';
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { redirect } from "react-router-dom";
export default function Register() {

  const [user, setUser] = useState({first_name:'',last_name:'',email:'',password:''});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function getUserData(e){
    // const myUser = {...user};
    // console.log(e.target.name);
    // console.log(e.target.value);
    // myUser[e.target.name] = e.target.value;
    // setUser(myUser);
    // console.log(myUser);
    setUser({...user,[e.target.name]:e.target.value});
  }
  async function registerUser(e){
    e.preventDefault();
    setIsLoading(true);
    const {data} = await axios.post(`https://sticky-note-fe.vercel.app/signup`,user);
    if(data.message === 'success'){

      // console.log(data);
      // return redirect("../signin");
      setIsLoading(false);
      navigate("../signin");
    }
    else{
      setIsLoading(false);
      setError(data.message);
    }
  }

  return (
    <>
    <div className="container">
        <div className=" row justify-content-center align-items-center vh-100">
          
        <form onSubmit={registerUser} className="w-75">
        <h3 className='display-1 text-center'>Register</h3>
            <div className="row my-3 ">
            <div className="col-md-6 form-floating">
                <input onChange={getUserData} type="text" className="form-control ps-2" id="first_name" name='first_name' placeholder='your first name' />
                <label htmlFor="first_name" className="form-label ms-2">First Name</label>
             </div>
            <div className="col-md-6 form-floating">
                <input onChange={getUserData} type="text" className="form-control ps-2" id="last_name" name='last_name'  placeholder='your last name' />
                <label htmlFor="last_name" className="form-label  ms-2">Last Name</label>
            </div>
            </div>
            <div className="row">
            <div className="col-12 form-floating">
                <input onChange={getUserData}
                type="email"
                className="form-control ps-2"
                id="email" name='email'
                placeholder="test@gmail.com"
             />
             <label htmlFor="email" className="form-label  ms-2">Email</label>
             </div>
            </div>

            <div className="row my-3">
            <div className="col-12 form-floating">
                <input onChange={getUserData}
                type="password"
                className="form-control ps-2"
                id="password" name='password'
                placeholder="password at least 3 char"
                />
                <label htmlFor="password" className="form-label ms-2">password</label>
            </div>                
            </div>

  <div className="col-12">
    <button  type="submit" className={"btn btn-primary w-100 py-3 text-white "+(isLoading?"disabled":"")}>{isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Sign Up"} </button>
  </div>
  { error && <div className="alert alert-danger mt-2">
    {error}
  </div>}
</form>
        </div>
    
    </div>
   
   
    </>
  )
}
