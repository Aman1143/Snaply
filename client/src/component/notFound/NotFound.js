import React from 'react'
import './NotFound.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div className='not'>
 <div class="mainbox">
    <div class="err">4</div>
    <i class="far fa-question-circle fa-spin class"></i>
    <div class="err2">4</div>
    <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <Link to='/auth'>home</Link> and try from there.</p></div>
      </div>

		</div>
	)
}

export default NotFound