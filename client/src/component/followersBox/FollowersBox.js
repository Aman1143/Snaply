import React,{useState} from 'react'
import '../followersCard/FollowersCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { followAndUnFollow } from '../../action/AuthAction'
import { useNavigate } from 'react-router-dom'

const FollowersBox = ({userId,username,profileImage}) => {
	const dispatch=useDispatch();
	const navigate=useNavigate();
	const {user}=useSelector((state)=>state.user)
	const [following, setFollowing] = useState(user?.following?.includes(userId));
	const handleFollowAndUnFollow=(id)=>{
    setFollowing(!following);
		dispatch(followAndUnFollow(id));
  }
  return (
	<>
		  
      <div className="follower">
      <div>
        <img
          src={profileImage}
          alt="profile"
          className="followerImage"
        />
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