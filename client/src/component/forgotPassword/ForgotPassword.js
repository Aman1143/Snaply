import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import './ForgotPassword.css'
import { forgotPassword } from '../../action/AuthAction';

const ForgotPassword = () => {

	const [email,setEmail]=useState();
	const disPatch=useDispatch();
	const handleSubmit=(e)=>{
		e.preventDefault();
	  alert("hello")
       disPatch(forgotPassword({email:email}));
	}
  return (
	<>
		<div className="forgotPassword">
			<form onSubmit={handleSubmit} style={{background:"#b5d2d247"}}>
				<input type="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)} style={{backgroundColor:"#d4dce4"}} />
				<button type="submit" className='btn'>Sent Token</button>
			</form>
		</div>
	</>
  )
}

export default ForgotPassword