import React from 'react'
import NewPost from '../NewPost/NewPost'
import Posts from '../Posts/Posts'
import './MiddleSide.css'

const MiddleSide = () => {
  return (
	<div className='MiddleSide'>
		{/* <NewPost /> */}
		<Posts />
	</div>
  )
}

export default MiddleSide