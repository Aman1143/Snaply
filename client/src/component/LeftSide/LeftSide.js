import React from 'react'
import Search from '../search/Search'
import Profile from '../profile/Profile'
import { Link, useNavigate } from 'react-router-dom'
import { UilHome } from '@iconscout/react-unicons'
import './LeftSide.css'
import logo from '../../image/avatar.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../action/AuthAction'

const LeftSide = () => {
  const { user } = useSelector((state) => state.user)
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    dispatch(logout(navigate));
  }
  return (
    <div className='LeftSide' >
      <div className="left_side">
        <Search />
        <div className="icon_logo">
          <div className="ic">
            <UilHome className='svg' />
          </div>
          <div className="logo_about">
            <Link to='/'>   <span style={{
              fontSize: 'x-large',
              fontWeight: 600
            }}>Home</span>
            </Link>
          </div>
        </div>
        <div className="icon_logo">
          <div className="ic">
            <i class="fas fa-plus"></i>
          </div>
          <div className="logo_about">
            <Link to='/newPost'><span style={{
              fontSize: 'x-large',
              fontWeight: 600
            }}>Post</span></Link>
          </div>
        </div>
        <div className="icon_logo">
          <div className="ic">
            <img src={user?.image?.url || logo} className='svg1' alt="" />
          </div>
          <div className="logo_about">
            <Link to='/profile'><span style={{
              fontSize: 'x-large',
              fontWeight: 600
            }}>Profile</span></Link>
          </div>
        </div>
        <div className="icon_logo">
          <div className="ic">
            <i class="fas fa-sign-out-alt"></i>
          </div>
          <div className="logo_about">
            <button style={{
              fontSize: 'x-large',
              fontWeight: 600,
              color: 'darkblue',
              borderBottom: '2px solid',
              cursor: 'pointer',
              backgroundColor: "transparent",
            }} onClick={handleLogout}> <span >Logout</span></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSide
