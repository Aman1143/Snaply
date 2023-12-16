import React, { useEffect, useState, useRef } from 'react'
import Post from '../post/Post'
import { useDispatch, useSelector } from 'react-redux'
import './Posts.css'
import { useAlert } from 'react-alert';
import { getAllpost } from '../../action/PostAction'
import { useNavigate } from 'react-router-dom'

const Posts = () => {
  const loadRef = useRef(null);
  const [num, setNumber] = useState(1);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, posts, error } = useSelector((state) => state.allPost);
  const [pts, setPts] = useState([]);

  const { message } = useSelector((state) => state.userMessage)
  useEffect(() => {
    dispatch(getAllpost(num));
  }, [dispatch, num]);

  useEffect(() => {
    if (posts) { 
        setPts(pts =>[...pts,...posts]);
    }
  }, [posts]);


  const isinview = (ele) => {
    return (ele?.getBoundingClientRect().top < window.innerHeight);
  }

  useEffect(() => {
    if (document.getElementsByClassName('MiddleSide')[0]) {
      document.getElementsByClassName('MiddleSide')[0].addEventListener('scroll', () => {
        let ele = document.getElementsByClassName('loadmores')[0]
        if (loadRef.current && isinview(loadRef.current)) {
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
  return (
    <div className='Posts'>
      {pts && pts.length > 0 ? (
        pts.map((post) => (
          <Post
            key={post?._id}
            postId={post?._id}
            caption={post?.caption}
            postImage={post?.image?.url}
            lkes={post?.likes}
            comments={post?.comments}
            ownerImage={post?.owner?.image?.url}
            ownerName={post?.owner?.username}
            ownerId={post?.owner?._id}
            date={post?.createdAt}
          />
        ))
      ) : (
        <>
          {loading && (
            <div className='loadmore'>
              <div className='loadingbox'>
                <i className='fas fa-spinner'></i>
              </div>
            </div>
          )}
          {!loading && <h1>No more posts</h1>}
        </>
      )}
      <div className="loadmores" ref={loadRef}>
        <div style={{display: "flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:"small",fontWeight:"600"}}>No more Posts</span>
          <div className='circle'></div>
        </div>
      </div>
    </div>
  );
};
export default Posts