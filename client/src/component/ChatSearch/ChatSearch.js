import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import './ChatSearch.css'
import avatar from '../../image/avatar.png'
import { createChat } from '../../action/ChatAction';
const ChatSearch = ({ isSearch, setIsSearch }) => {
  const dispatch=useDispatch();
  const { person } = useSelector((state) => state.searchQuery)
  const handleClick = (e, receivedId) => {
    e.preventDefault();
    setIsSearch(false);
    dispatch(createChat({receivedId:receivedId}));
  };
  return (
    <div className="LogoSearch">
      {isSearch && (
        <div className="searchPerson">
          <div className="cutSearch" onClick={() => setIsSearch(false)}>
            <i className="fas fa-times"></i>
          </div>
          {person && person.length > 0 && (
            person.map((item) => (
              <div>
                <a href="#" className="list-group-item list-group-item-action border-0 profileTag">
                  <div className="badge bg-success float-right notificationBox">5</div>
                  <div className="d-flex align-items-start">
                    <div className="imge">
                      <img src={avatar} alt="Vanessa Tucker" width="40" height="40" />
                    </div>
                    <div className="flex-grow-1 ml-3 nameBox ">
                      {item.name}
                      <div className='chatbox'>
                        <div className="small"><span className="fas fa-circle chat-online"></span> Online</div>
                        <div className="chat">
                          <button onClick={(e) => { handleClick(e, item?._id) }} className='chatbtn'>Chat</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ChatSearch