import React, { useEffect, useState } from 'react'
import './Search.css'
import '../followersCard/FollowersCard.css'
import { UilSearch } from '@iconscout/react-unicons'
import { useDispatch, useSelector } from 'react-redux';
import { searchFriends } from '../../action/AuthAction';
import logo from '../../image/avatar.png'

const Search = () => {
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const dispatch = useDispatch();
  const { person } = useSelector((state) => state.searchQuery)
  const { user } = useSelector((state) => state.user)
  const [following, setFollowing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchFriends(query));
    setIsSearch(true);
  }

  useEffect(() => {
    if (person) {
      setFollowing(user?.following.includes(person?._id))
    } else {
      setFollowing(false);
    }
  }, [person, user]);

  return (
    <div className="LogoSearch">
      <div className="Search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='search'
            onChange={(e) => setQuery(e.target.value)}
            placeholder="#Explore"
            required
            style={{ marginBottom: "10px", outline: 'none' }}
          />
          <div className="s-icon">
            <button type='submit'> <UilSearch /></button>
          </div>
        </form>
      </div>

      {isSearch && (
        <div className="searchPerson">
          <div className="cutSearch" onClick={() => setIsSearch(false)}>
            <i className="fas fa-times"></i>
          </div>
          {person && person.length > 0 ? (
            person.map((item)=>(
				<div className="searchColom">
              <div>
               <a href={`/profile/${item._id}`}> <img
                  src={item.image?.url}
                  alt="profile"
                  className="followerImage"
                /></a>
                <div className="name">
                  <span>{item.username}</span>
                  <span>{item.bio}</span>
                </div>
              </div>
              <button className={following ? "button fc-button UnfollowButton" : "button fc-button"}>
                {following ? "Unfollow" : "Follow"}
              </button>
            </div>
			))
          ) : (
            <div className="notFound">
              <h3>User not found</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Search;
