import React,{useEffect, useState} from 'react'
import './FollowersCard.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser, getMe } from '../../action/AuthAction'
import FollowersBox from '../followersBox/FollowersBox'

const FollowersCard = () => {
  const [following, setFollowing] = useState(true)
  const {me}=useSelector((state)=>state.meUser);
  let users=useSelector((state)=>{
    let a = state.allUsers;
    let us = a?.users?.filter((us)=>us._id!==me?._id); 
    return us;
  });
  const dispatch=useDispatch();
  useEffect(()=>{
   dispatch(getAllUser());
   dispatch(getMe());
  },[dispatch])



  return (
	<div className="FollowersCard">
  <h3>People you may know</h3>
  {
    users && users.length >0 ?(
      users.map((item)=>{
        return (
        <FollowersBox
          key={item._id}
          userId={item._id}
          username={item.username}
          profileImage={item.image.url}
       />
      )})
    ):(
      <h3>No one here</h3>
    )
  }
    </div>
  )
}

export default FollowersCard