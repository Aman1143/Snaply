import React from 'react'
import FollowersCard from '../followersCard/FollowersCard'
import './RightSide.css'
import TreandCard from '../TreandCard/TreandCard'
import Navicon from '../Navicon/Navicon'

const RightSide = () => {
  return (
	<div className='RightSide'>
		<Navicon />
		{/* <TreandCard /> */}
		<FollowersCard />

	</div>
  )
}

export default RightSide