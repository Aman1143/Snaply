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
			<form onSubmit={handleSubmit}>
				<input type="email" name="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
				<button type="submit" className='btn'>Sent Token</button>
			</form>
		</div>
	</>
  )
}

export default ForgotPassword