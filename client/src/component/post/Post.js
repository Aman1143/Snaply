import React, { useEffect, useState } from 'react'
import './Post.css'
import moment from 'moment'
import avatar from '../../image/avatar.png'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addComment, allCmts, allUserLks, deletePost, likeUnlike } from '../../action/PostAction'
import { followAndUnFollow } from '../../action/AuthAction'
import { getMe } from '../../api/AuthRequest';
const Post = ({ postId, caption, postImage, lkes = [], comments = [], ownerImage, ownerName, ownerId, date }) => {
	const timeago = moment(date).fromNow();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();
	const [cmtShow, setCmtShow] = useState(false);
	const [likShow, setLikShow] = useState(false);
	const { me } = useSelector((state) => state.meUser);
	const { loading: likeLoading, usrLks } = useSelector((state) => state.allUserlkes);
	const { loading: cmtLoading, userComments } = useSelector((state) => state.userComment);
	const [likes, setLikes] = useState(lkes);
	const [cmts, setCmts] = useState(comments);
	const [isLike, setIsLike] = useState(false);
	const [userLike, setUserLike] = useState(lkes.includes(me?._id));
	const [comment, setCommecnt] = useState("");
	const [following, setFollowing] = useState(me?.following?.includes(ownerId))

	useEffect(() => {
		getMe();
	}, [dispatch])

	const handleLikeUnlike = (id) => {
		setIsLike(!isLike);
		if (userLike) {
			setLikes(likes.filter((l) => l != me?._id));
		} else {
			setLikes([...likes, me?._id]);

		}
		setUserLike(() => {
			return !userLike;
		});
		dispatch(likeUnlike(id, navigate));
	}

	const handleComment = (e) => {
		e.preventDefault();
		let date = new Date();
		setCmts([...cmts, { user: me?._id, date: date, comment: comment }]);
		dispatch(addComment(postId, { comment: comment }, navigate));
		setCommecnt("");
	}

	const handleFollowAndUnFollow = (id) => {
		setFollowing(!following);
		dispatch(followAndUnFollow(id));
	}
	const handleClick = (id) => {
		dispatch(deletePost(id, navigate));
	}
	const handleCommentShow = (e) => {
		e.preventDefault();
		setCmtShow((prev) => !prev);
		dispatch(allCmts(postId));
	}
	const handleLikShow = (e) => {
		e.preventDefault();
		setLikShow((prev) => !prev);
		dispatch(allUserLks(postId));

	}
	return (
		<div class="post_card">
			<div class="top">
				<div class="post_info">
					<a href={`/profile/${ownerId}`} ><img src={ownerImage} alt="" /></a>
					<div class="user-name">
						<p class="name">{ownerName}</p>
						<p class="id">@{ownerName}</p>
					</div>
				</div>
				<div class="icon">
					{
						ownerId !== me?._id && (
							<button className={following ? "button fc-button UnfollowButton" : "button fc-button"} onClick={() => handleFollowAndUnFollow(ownerId)}>
								{following ? "Unfollow" : "Follow"}
							</button>
						)
					}
				</div>
			</div>
			<div class="body">
				<div className="image">
					<img src={postImage} alt="" />
				</div>
				<div class="body-icons">
					{
						userLike ? (
							<div className="like">
								<i className="fas fa-heart" style={{ color: "red" }} onClick={() => handleLikeUnlike(postId)}></i>
								<span style={{ paddingLeft: '5px', cursor: "pointer" }} onClick={(e) => handleLikShow(e)}>{likes.length} likes</span>
							</div>
						) : (
							<div className="like" >
								<i className="far fa-heart" onClick={() => handleLikeUnlike(postId)}></i>
								<span style={{ paddingLeft: '5px', cursor: 'pointer' }} onClick={(e) => handleLikShow(e)}>{likes.length} likes</span>
							</div>
						)
					}
					<div className="comment" onClick={(e) => handleCommentShow(e)}>
						<i class="far fa-comment"></i>
						<span style={{ paddingLeft: '5px', cursor: 'pointer' }}>{cmts.length} comment</span>
					</div>
				</div>
			</div>
			<div class="bottom-section">
				<div class="sub-heading">
					<h4>Caption...</h4>
					<h6>Time:<span>{timeago}</span></h6>
				</div>
				<p># {caption}</p>
				<div class="bottom">
					<form onSubmit={handleComment}>
						<input type="text" name='comment' onChange={(e) => setCommecnt(e.target.value)} placeholder="Add A Comment..." value={comment} />
						<button type="submit">	<i class="far fa-paper-plane"></i></button>
					</form>
					{
						ownerId === me?._id && (
							<div className="delete">
								<button onClick={() => handleClick(postId)}><i class="fas fa-trash"></i></button>
							</div>
						)
					}
				</div>
			</div>
			{
				cmtShow && (
					<div className="commentSection" >
						<div className="cross">
							<i class="far fa-times-circle cut" onClick={(e) => handleCommentShow(e)}></i>
						</div>
						<div className="cmt">
							comments
						</div>
						{
							userComments && userComments.length > 0 ? (
								userComments.map((ele) => (
									ele.user.map((ele1) => (
										<div className="cmtBody">
											<div className="cmtporfile">
												<a href={`/profile/${ele1?._id}`}>  <img
													src={ele1.image?.url}
													alt="profile"
													className="followerImages"
												/></a>
											</div>
											<div className="nameCmt">
												<div className="username">
													{ele1.username}
												</div>
												<div className="cmtContent">
													{ele.comment}
												</div>
												<div className='date'>
													{moment(ele.date).fromNow()}
												</div>
											</div>
										</div>
									))
								))
							) : (
								<>
									{cmtLoading && (
										<div className='loadmore'>
											<div className='loadingbox'>
												<i className='fas fa-spinner'></i>
											</div>
										</div>
									)}
									{!cmtLoading && (
										<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
											<span style={{ fontSize: "small", fontWeight: "600" }}>No Comments yet!</span>
										</div>
									)}
								</>
							)
						}
					</div>
				)
			}

			{
				likShow && (
					<div className="commentSection"  >
						<div className="cross" onClick={(e) => handleLikShow(e)}>
							<i class="far fa-times-circle cut" ></i>
						</div>
						<div className="cmt">
							Likes
						</div>

						{
							usrLks && usrLks.length > 0 ? (
								usrLks.map((ele) => (
									<div className="follower">
										<div>
											<a href={`/profile/${ele?._id}`}>   <img
												src={ele?.image?.url}
												alt="profile"
												className="followerImage"
											/></a>
											<div className="name">
												<span>{ele.firstName}</span>
												<span style={{ textTransform: "lowercase" }}>@{ele.username}</span>
											</div>
										</div>
										{
											ownerId !== me?._id && (
												<button className={following ? "button fc-button UnfollowButton" : "button fc-button"} onClick={() => handleFollowAndUnFollow(ownerId)}>
													{following ? "Unfollow" : "Follow"}
												</button>
											)
										}
									</div>
								))
							) : (
								<>
									{likeLoading && (
										<div className='loadmore'>
											<div className='loadingbox'>
												<i className='fas fa-spinner'></i>
											</div>
										</div>
									)}
									{!likeLoading && (
										<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
											<span style={{ fontSize: "small", fontWeight: "600" }}>No likse yet!</span>
										</div>
									)}
								</>
							)
						}
					</div>
				)
			}
		</div>

	)
}

export default Post