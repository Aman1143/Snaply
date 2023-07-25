import React, { useEffect, useState } from 'react'
import Post from '../post/Post'
import { useDispatch, useSelector } from 'react-redux'
import './Posts.css'
import { useAlert } from 'react-alert';
import { getAllpost } from '../../action/PostAction'
import { useNavigate } from 'react-router-dom'
import Loading from '../../pages/loading/Loading'

const Posts = () => {
  const [num, setNumber] = useState(2);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading, posts, error } = useSelector((state) => state.allPost)
  const { message } = useSelector((state) => state.userMessage)
  const [post,setPost]=useState(posts);
  useEffect(() => {
    dispatch(getAllpost(num));
  }, [dispatch, num]);

  const isinview = (ele) => {
    return (ele.getBoundingClientRect().top < window.innerHeight);
  }

  useEffect(() => {
    if (document.getElementsByClassName('MiddleSide')[0]) {

      document.getElementsByClassName('MiddleSide')[0].addEventListener('scroll', () => {
        let ele = document.getElementsByClassName('loadmore')[0]
        if (isinview(ele)) {
          setNumber((prev) => prev + 1);
        }
      })
    }
  }, [])


  useEffect(() => {
    if (error || message) {
      alert.error(<div style={{ color: 'white' }}>{error || message}</div>);
    }
  }, [error, message]);
  if (posts === null)
    return;
  return (
    <div className='Posts'>
      {posts && posts.length > 0 && (
        
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
      }
      <div className="loadmore">
        <div className="loadingbox">X</div>
      </div>
    </div>
  )
}

export default Posts