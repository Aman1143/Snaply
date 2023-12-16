import React, { useEffect, useState } from 'react'
import '../profile/Profile.css'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../image/avatar.png'
import { addComment, deletePost, likeUnlike } from '../../action/PostAction'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../action/AuthAction'


const Myposts = ({ postId, caption, postImage, lkes = [], comments = [], ownerImage, ownerName, ownerId, date }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [likes, setLikes] = useState(lkes);
	const { me } = useSelector((state) => state.meUser);
	const timeago = moment(date).fromNow();
	const [userLike, setUserLike] = useState(likes.includes(ownerId));
	const [comment, setCommecnt] = useState("");
	const [cmts, setCmts] = useState(comments);
	const [isLike, setIsLike] = useState(false);


	useEffect(() => {
		getMe();
	}, [dispatch])
	const handleClick = (id) => {
		dispatch(deletePost(id))
	}
	const handleComment = (e) => {
		e.preventDefault();
		setCmts([...cmts, { user: me?._id, comment: comment }]);
		dispatch(addComment(postId, { comment: comment }));
		setCommecnt("");
	}
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
		dispatch(likeUnlike(id));
	}
	return (
		<>
			<div className="your_posts">
				<div class="post_card">
					<div class="top">
						<div class="post_info">
							<a href="#" target="_blank"><img src={ownerImage || avatar} alt="profileImage" /></a>
							<div class="user-name">
								<p class="name">{ownerName}</p>
								<p class="id">@{ownerName}</p>
							</div>
						</div>
					</div>
					<div class="body">
						<div className="image">
							<img src={postImage} alt="" style={{ marginLef: '33px' }} />
						</div>
						<div class="body-icons">
							{
								userLike ? (
									<div className="like">
										<i className="fas fa-heart" style={{ color: "red" }} onClick={() => handleLikeUnlike(postId)}></i>
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
								<span style={{ paddingLeft: '5px' }}>{cmts.length}  comment</span>
							</div>
						</div>
					</div>
					<div class="bottom-section">
						<div class="sub-heading">
							<h6>Time:<span>{timeago}</span></h6>
						</div>
						<p># {caption}</p>
						<div class="bottom">
							<form onSubmit={handleComment}>
								<input type="text" name='comment' onChange={(e) => setCommecnt(e.target.value)} placeholder="Add A Comment..." value={comment} />
								<button type="submit">	<i class="far fa-paper-plane enter"></i></button>
							</form>

							<div className="delete">
								<button onClick={() => handleClick(postId)}><i class="fas fa-trash"></i></button>
							</div>

						</div>
					</div>
				</div>
			</div >
		</>
	)
}

export default Myposts