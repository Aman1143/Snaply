import React, { useEffect, useState } from 'react'
import './ChatLeft.css'
import ChatSearch from '../ChatSearch/ChatSearch';
import { useDispatch, useSelector } from 'react-redux';
import ChatConversation from '../chatConversation/ChatConversation';
import { getMe, searchFriends } from '../../action/AuthAction';
import { getConversations } from '../../action/ChatAction';

const ChatLeft = ({setCurrentChat,onlineUsers}) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.meUser);
  const { conversations } = useSelector((state) => state.getConversation)
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    dispatch(getConversations(me?._id));
    dispatch(getMe());
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSearch(true);
    dispatch(searchFriends(query));
    setQuery("");
  } 
  return (
    <div className='leftSide'>
      <div className="col-12 col-lg-5 col-xl-3 border-right userBox">

        <div className="px-4 d-none d-md-block">
          <div className="d-flex align-items-center">
            <div className="flex-grow-1 bottom">
              <form onSubmit={handleSubmit} style={{position:"relative",width:"100%"}}>
                <input type="text" className="form-control my-3" placeholder="create chat..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit" className='btun'><i class="far fa-paper-plane"></i></button>
              </form>
            </div>
          </div>
        </div>
        {
          !isSearch && conversations && conversations.length > 0 && (
            conversations.map((item) => (
                <div onClick={() => setCurrentChat(item)} key={item._id} style={{marginBottom:"10px"}}>
                <ChatConversation cnversation={item} currentUser={me} onlineUsers={onlineUsers}/>
              </div>
            ))
          )
        }
        {isSearch ? <ChatSearch isSearch={isSearch} setIsSearch={setIsSearch} /> : null}
        <hr className="d-block d-lg-none mt-1 mb-0" />
      </div>
    </div>
  )
}

export default ChatLeft