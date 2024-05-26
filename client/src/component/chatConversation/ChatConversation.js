import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../chatLeft/ChatLeft.css'
import { getFriends } from '../../action/ChatAction';

const ChatConversation = ({ cnversation, currentUser, onlineUsers }) => {
  const dispatch = useDispatch();
  const { friends } = useSelector((state) => state.getFriEnds);
  useEffect(() => {
    const friendId = cnversation.members.find((m) => m !== currentUser._id);
    dispatch(getFriends(friendId)); 
  }, [currentUser, cnversation])
  return (
    <div style={{ border: "2px solid #d4d0c9", borderRadius: "5px" }} >
      <a href="#" className="list-group-item list-group-item-action border-0 profileTag" key={cnversation} >
        <div className="badge bg-success float-right notificationBox">5</div>
        <div className="d-flex align-items-start boxContent">
          <div className="imge">
            <img src={friends?.image?.url} alt="Vanessa Tucker" width="40" height="40" style={{ borderRadius: "50%" }} />
          </div>
          <div className="flex-grow-1 ml-3 nameBox">
            <span style={{ textDecoration: "none", fontSize: "large", fontWeight: "400", color: "#828663e8" }}>{friends?.username}</span>
            <div className="small"><span className="fas fa-circle chat-online"></span></div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default ChatConversation