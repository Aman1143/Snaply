import React, { useEffect, useState } from 'react'
import Search from '../search/Search'
import Profile from '../profile/Profile'
import { Link, useNavigate } from 'react-router-dom'
import { UilHome } from '@iconscout/react-unicons'
import './LeftSide.css'
import logo from '../../image/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, logout } from '../../action/AuthAction'

const LeftSide = () => {
  const { user } = useSelector((state) => state.user)
  const { me } = useSelector((state) => state.meUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [])
  const handleLogout = (e) => {
    dispatch(logout(navigate));
  }
  return (
    <div className='LeftSide' >
      <div className="left_side">
        <Search />
        <div className="icon_logo">
          <div className="ic">
          <i class="fas fa-home-lg-alt"></i>
          </div>
          <div className="logo_about">
            <Link to='/'>   <span className='heading'>Home</span>
            </Link>
          </div>
        </div>
        <div className="icon_logo">
          <div className="ic">
            <i class="fas fa-plus"></i>
          </div>
          <div className="logo_about">
            <Link to='/newPost'><span className='heading'>Post</span></Link>
          </div>
        </div>
        <div className="icon_logo">
          <div className="ic">
            <img src={me?.image?.url || logo} className='svg1' alt="" />
          </div>
          <div className="logo_about">
            <Link to={`/profile/${me?._id}`}>
              <span className='heading'>Profile</span>
            </Link>

          </div>
        </div>
        <div className="icon_logo">
          <div className="ic">
            <i class="fas fa-sign-out-alt"></i>
          </div>
          <div className="logo_about">
            <button  className='heading logout' onClick={handleLogout}> <span >Logout</span></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSide
