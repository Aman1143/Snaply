import React, { useEffect, useState } from 'react'
import './Profile.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import '../edit/EditProfile.css'
import avatar from '../../image/avatar.png'
import { editProfile, getMyProfile } from '../../action/AuthAction'
import { getMyPosts } from '../../action/PostAction'
import Myposts from '../myPosts/Myposts'


const Profile = () => {
	const dispatch = useDispatch();
	const navigate=useNavigate();
	const param=useParams();
	const [edit, setEdit] = useState(false);
	const { self } = useSelector((state) => state?.profile)
	const { selfPosts } = useSelector((state) => state?.myPosts);
	const {user}=useSelector((state)=>state?.user);
	
		const initialState = {
			firstName: user?.firstName || "",
			lastName: user?.lastName || "",
			bio: user?.bio || "",
			image:"",
			ytlink:user?.ytlink || "",
			fblink:user?.fblink || "",
		  }; 
	const [data, setData] = useState(initialState);
	const [img,setImg]=useState("");


	  const handleImageChange=(e)=>{
		const file = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
			  if (reader.readyState === 2) {
				setData({...data,image:reader.result})
				setImg(reader.result);
			  }
			}
	  }
	  const handleChnage = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	  }

	useEffect(() => {
		dispatch(getMyProfile());
		dispatch(getMyPosts());
	}, [dispatch])

	const handleEdit=(e)=>{
		e.preventDefault();
        dispatch(editProfile(data,navigate));
		
	}

	if(self==null)
	return;
	if(selfPosts==null)
	return;
	return (
		<>
			{
				edit && (
					<div class="formbold-main-wrapper">
						<div className="cut" onClick={(prev) => setEdit(!prev)}>
							<i class="fas fa-times"></i>
						</div>
						<div class="formbold-form-wrapper">
							<form  onSubmit={handleEdit}>
								<div class="formbold-input-flex">
									<div>
										<label for="firstName" class="formbold-form-label">
											First name
										</label>
										<input
											type="text"
											name="firstName"
											id="firstname"
											class="formbold-form-input"
											value={data.firstName}
											onChange={handleChnage}
										/>
									</div>
									<div>
										<label for="lastName" class="formbold-form-label"> Last name </label>
										<input
											type="text"
											name="lastName"
											id="lastName"
											class="formbold-form-input"
											value={data.lastName}
											onChange={handleChnage}
										/>
									</div>
								</div>
								<div class="formbold-mb-3">
									<label for="bio" class="formbold-form-label">
										Bio
									</label>
									<input
										type="text"
										name="bio"
										id="bio"
										class="formbold-form-input"
										value={data.bio}
										onChange={handleChnage}
									/>
								</div>
								<div class="formbold-input-flex">
									<div>
										<label for="ytlink" class="formbold-form-label">YouTube</label>
										<input
											type="url"
											name="ytlink"
											id="youtube"
											class="formbold-form-input"
											value={data.ytlink}
											onChange={handleChnage}
										/>
									</div>
									<div>
										<label for="fblink" class="formbold-form-label">Facebook</label>
										<input
											type="url"
											name="fblink"
											id="facebook"
											class="formbold-form-input"
											value={data.fblink}
											onChange={handleChnage}
										/>
									</div>
								</div>

								<div class="formbold-input-flex">
									<div>
										<div className="identy">
											<label className='identy_label formbold-form-label cls' for="img"><span style={{ marginRight: '33px', fontSize: '14px', lineHeight: '14px', letterSpacing: '0.5px' }}>ProfileImage</span><img src={user.image.url} alt="" srcset="" /></label>
										</div>
										<input type="file" name='img' hidden id='img' onChange={handleImageChange} style={{ display: 'none' }} />
									</div>
								</div>
								<button class="formbold-btn" type='submit'>Submit</button>
							</form>
						</div>
					</div>
				)
			}

			{
				!edit && (
					<div className="profile_page">
						<div class="card-container">
							<span class="pro">PRO</span>
							<img class="round" src={self?.image.url} alt="user" />
							<h3>{self.username}</h3>
							<a style={{ cursor: "pointer",display:'block' }}>{self?.fblink || "facebook"}</a>
							<a style={{ cursor: "pointer" }}>{self?.ytlink || "youtube"}</a>
							<p>{self.bio || "User interface designer and"}</p>
							<div class="buttons">
								<button class="primary" onClick={(e) => {setEdit(!edit)}} >
									Edit
								</button>

							</div>
							<div class="skills">
								<div className="friend_heading">
									<span style={{ cursor: "pointer" }}>{self?.posts.length} </span><span style={{ color: 'orange',cursor:'pointer' }}>Posts</span>
								</div>
								<div className="col_friend">
									<div>
										<span style={{ cursor: "pointer" }}>{self?.followers.length} </span><span className="followers" style={{ color: 'orange',cursor:'pointer' }}>Followers</span>
									</div>
									<div className="following">
										<span style={{ cursor: "pointer" }}>{self?.following.length} </span><span style={{ color: 'orange',cursor:'pointer' }}>Following</span>
									</div>
								</div>


							</div>
						</div>
					</div>
				)
			}
			{
				!edit && (
					selfPosts && selfPosts.length > 0 ? (
						selfPosts?.map((post) => (
							<Myposts
								key={post._id}
								postId={post._id}
								caption={post.caption}
								postImage={post?.image?.url}
								likes={post.likes}
								comments={post.comments}
								ownerImage={post.owner?.image?.url}
								ownerName={post.owner.username}
								ownerId={post.owner._id}
								date={post.createdAt}

							/>
						))
					) : (
						<h3>No your posts</h3>
					)
				)
			}


		</>
	)
}

export default Profile