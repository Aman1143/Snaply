import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import { login, signUp } from '../../action/AuthAction';
import { useAlert } from 'react-alert';
import avatar from '../../image/avatar.png'

const Auth = () => {
  const {user, error } = useSelector((state) => state.user);
  const [isSignUp, setIsSignUp] = useState(true);
  const initialState = {
    username: "",
    password: "",
    email: "",
    image: "",
  };
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [img, setImg] = useState("");
  const handleChnage = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setData({ ...data, image: reader.result })
        setImg(reader.result);
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(data, navigate))
    } else {
      dispatch(login(data, navigate));
    }
  }
  useEffect(() => {
    if (error) {
      alert.error(<div style={{ color: 'white' }}>{error}</div>);
    }
  }, [user]);

  return (
    <>
      <div className="auth">
        <div class="background">
          <div class="shape"></div>
          <div class="shape"></div>
        </div>
        <div className="authendication">
          <form action='post' onSubmit={handleSubmit}>
            <h3>{isSignUp ? 'Register' : 'Login'}</h3>
            {
              isSignUp && (
                <div className="identy">
                  <label className='identy_label' for="img"><img src={avatar} alt="" srcset="" /></label>
                </div>
              )
            }
            {
              isSignUp && (
                <div>
                  <label for="username">Username</label>
                  <input type="text" placeholder="username" name='username' value={data.username} onChange={handleChnage} required />
                </div>
              )
            }

            <label for="email">Email</label>
            <input type="email" placeholder="Email" name='email' value={data.email} onChange={handleChnage} required />

            <label for="password">Password</label>
            <input type="password" placeholder="Password" name='password' value={data.password} onChange={handleChnage} required />


            <input type="file" name='img' hidden id='img' onChange={handleImageChange} style={{ display: 'none' }} />

            <button type="submit">Go</button>
            <div className="check">
              <span
                style={{
                  fontSize: "12px",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  // resetForm();
                  setIsSignUp((prev) => !prev);
                }}
              >
                {isSignUp
                  ? "Already have an account Login"
                  : "Don't have an account Sign up"}
              </span>
            </div>
            {
              !isSignUp &&(
                <div class="social">
                  <Link  to='/forgotPassword'>  forgot Password?</Link>
                </div>
              )
            }
          </form>
        </div>
      </div>
    </>
  )
}

export default Auth
