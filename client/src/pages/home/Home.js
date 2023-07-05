import React from 'react'
import LeftSide from '../../component/LeftSide/LeftSide'
import MiddleSide from '../../component/middleSide/MiddleSide'
import RightSide from '../../component/rightSide/RightSide'
import './Home.css'

const Home = () => {
  return (
	<div className="Home">
		<LeftSide />
		<MiddleSide />
		<RightSide />
	</div>
  )
}

export default Home