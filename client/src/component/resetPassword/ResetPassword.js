import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../action/AuthAction';
import './ResetPassword.css'

const ResetPassword = () => {
	const [password,setPassword]=useState("");
	const dispatch=useDispatch();
	const params=useParams();
	const navigate=useNavigate();
	const handleSubmit=(e)=>{
		e.preventDefault();
		dispatch(resetPassword({token: params.token, password},navigate));
	}
  return (
	<div className="resetPassword">
			<form onSubmit={handleSubmit}>
				<input type="password" name="password" required value={password} onChange={(e)=>setPassword(e.target.value)} />
				<button type="submit">Reset Password</button>
			</form>
		</div>
  )
}

export default ResetPassword