import React, { useEffect, useState } from 'react'
import './Post.css'
import { useAlert } from 'react-alert';
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addComment, deletePost, getAllpost, likeUnlike } from '../../action/PostAction'
import { followAndUnFollow } from '../../action/AuthAction'
const Post = ({ postId, caption, postImage, lkes = [], comments = [], ownerImage, ownerName, ownerId, date}) => {
	const timeago = moment(date).fromNow();
	const { user, error } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();
	const [likes, setLikes] = useState(lkes);
	const [cmts,setCmts]=useState(comments);
	// const [folloBox,setFollowBox]=useState(followers);
	// const [followingBox,setFollowingBox]=useState(user?.following);
	const [isLike, setIsLike] = useState(false);
	const [userLike, setUserLike] = useState(lkes.includes(user?._id));
	const [comment, setCommecnt] = useState("");
	const [isDelete, setIsDelete] = useState(false)
	const [following, setFollowing] = useState(user?.following?.includes(ownerId))

	const handleLikeUnlike = (id) => {
		setIsLike(!isLike);
		if(userLike){
			setLikes(likes.filter((l)=>l!=user?._id));
		}else{
			setLikes([...likes, user?._id]);
			
		}
		setUserLike(()=>{
			return !userLike;
		});
		dispatch(likeUnlike(id, navigate));
	}

	const handleComment = (e) => {
		e.preventDefault();
		console.log(cmts);
		setCmts([...cmts,{user:user?._id,comment:comment}]);
		dispatch(addComment(postId, { comment: comment }, navigate));
		console.log(cmts);
		setCommecnt("");
	}

	const handleFollowAndUnFollow = (id) => {
		setFollowing(!following);
		dispatch(followAndUnFollow(id));
	}
	const handleClick = (id) => {
		dispatch(deletePost(id,navigate));
	}
	useEffect(() => {
		if (error) {
			alert.error(<div style={{ color: 'white' }}>{error}</div>);
		}
	}, []);

	// useEffect(() => {
	// 	likes.forEach((item) => {
	// 		if (item._id === user._id) {
	// 			setUserLike(true);
	// 		}
	// 	});
	// 	if(userLike){
	// 		console.log("User ne like kiya hu ajp")
	// 	}else{
	// 		console.log("user ne like naji kiya hai");
	// 	}
	// }, [likes, user._id]);

	return (
		<div class="post_card">
			<div class="top">
				<div class="post_info">
					<a href='#' ><img src={ownerImage} alt="" /></a>
					<div class="user-name">
						<p class="name">{ownerName}</p>
						<p class="id">@workforwin</p>
					</div>
				</div>
				<div class="icon">
					{
						ownerId !== user?._id && (
							<button className={following ? "button fc-button UnfollowButton" : "button fc-button"} onClick={() => handleFollowAndUnFollow(ownerId)}>
								{following ? "Unfollow" : "Follow"}
							</button>
						)
					}
				</div>
			</div>
			<div class="body">
				<img src={postImage} alt="" />
				<div class="body-icons">
					{
						userLike ? (
							<div className="like">
								<i className="fas fa-heart" onClick={() => handleLikeUnlike(postId)}></i>
								<span style={{ paddingLeft: '5px' }}>{likes.length} likes</span>
							</div>
						) : (
							<div className="like">
								<i className="far fa-heart" onClick={() => handleLikeUnlike(postId)}></i>
								<span style={{ paddingLeft: '5px', cursor: 'pointer' }}>{likes.length} likes</span>
							</div>
						)
					}
					<div className="comment">
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
				<p>{caption}</p>
				<div class="bottom">
					<form onSubmit={handleComment}>
						<input type="text" name='comment' onChange={(e) => setCommecnt(e.target.value)} placeholder="Add A Comment..." value={comment} />
						<button type="submit">	<i class="far fa-paper-plane"></i></button>
					</form>
					{
						ownerId === user?._id && (
							<div className="delete">
								<button onClick={() => handleClick(postId)}><i class="fas fa-trash"></i></button>
							</div>
						)
					}
				</div>
			</div>
		</div>

	)
}

export default Post