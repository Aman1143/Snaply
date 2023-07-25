import React,{useEffect, useState} from 'react'
import '../followersCard/FollowersCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnFollow, getMe } from '../../action/AuthAction'
import { useNavigate } from 'react-router-dom'

const FollowersBox = ({userId,username,profileImage}) => {
	const dispatch=useDispatch();
	const navigate=useNavigate();
  const {me}=useSelector((state)=>state.meUser);
	const [following, setFollowing] = useState(me?.following?.includes(userId));
	const handleFollowAndUnFollow=(id)=>{
    setFollowing(!following);
		dispatch(followAndUnFollow(id));
  }
  useEffect(()=>{
   getMe();
  },[dispatch])
  return (
	<>
		  
      <div className="follower">
      <div>
        <a href={`/profile/${userId}`}>   <img
          src={profileImage}
          alt="profile"
          className="followerImage"
        /></a>
        <div className="name">
          <span>{username}</span>
          <span>ppet</span>
        </div>
      </div>
      <button className={ following ? "button fc-button UnfollowButton" : "button fc-button" } onClick={()=>handleFollowAndUnFollow(userId)}>
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
	</>
  )
}

export default FollowersBox