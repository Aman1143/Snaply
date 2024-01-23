import React, {  useState } from 'react'
import './HomeChat.css'
import ChatLeft from '../../component/chatLeft/ChatLeft'
import ChatRight from '../../component/chatRight/ChatRight'



const HomeChat = () => { 
	const [currentChat, setCurrentChat] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	return (
		<div className="home">
			<ChatLeft setCurrentChat={setCurrentChat} onlineUsers={onlineUsers} />
			<ChatRight  currentChat={currentChat} setOnlineUsers={setOnlineUsers}   />
		</div>
	)
}

export default HomeChat