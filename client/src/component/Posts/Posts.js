import React, { useEffect } from 'react'
import Post from '../post/Post'
import {useDispatch, useSelector} from 'react-redux'
import './Posts.css'
import { useAlert } from 'react-alert';
import { getAllpost } from '../../action/PostAction'
import {useNavigate} from 'react-router-dom'
import Loading from '../../pages/loading/Loading'

const Posts = () => {
	const dispatch=useDispatch();
  const navigate=useNavigate();
  const alert=useAlert();
	const {loading,posts,error}=useSelector((state)=>state.allPost)
  const {message}=useSelector((state)=>state.userMessage)
	useEffect(()=>{
		dispatch(getAllpost(navigate));
	},[dispatch]);

  useEffect(() => {
    if (error || message) {
      alert.error(<div style={{ color: 'white' }}>{error || message}</div>);
    }
  }, [error,message]);
  if(posts===null)
   return ;
  return (
	<div className='Posts'>
		{posts && posts.length > 0 ? (
      loading ? (
        <Loading />
      ):(
      posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image?.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner?.image?.url}
              ownerName={post.owner.username}
              ownerId={post.owner._id}
              date={post.createdAt}
            />
          ))
      )
        ) : (
          <h3 >No posts yet</h3>
        )}
	</div>
  )
}

export default Posts