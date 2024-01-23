import React, { useEffect, useRef, useState } from 'react'
import './ChatRight.css'
import { useDispatch, useSelector } from 'react-redux'
import avatar from '../../image/avatar.png'
import { io } from 'socket.io-client'
import moment from 'moment'
import { getMe } from '../../action/AuthAction'
import { getMessage, getSender, sendMessage } from '../../action/ChatAction'

const ChatRight = ({ currentChat, setOnlineUsers }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.meUser);
  const { message } = useSelector((state) => state.userMessage);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { seder } = useSelector((state) => state.getSenDer)
  const [mesage, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [typingUser, setTypingUser] = useState();
  const scollRef = useRef();


  const receivedId = currentChat?.members.find(member => member !== me?._id)

  useEffect(() => {
    getMe();
  }, [])
  const host = "http://localhost:4000";
  const [socket, setSocket] = useState();
  useEffect(() => {
    setSocket(io.connect(`${host}`));
    dispatch(getMe());
  }, []);
  useEffect(() => {
    socket?.emit('addUser', me?._id);
    socket?.on('getUsers', users => {
      setOnlineUsers(users);
    })
  }, [socket, me])


  useEffect(() => {
    dispatch(getMessage(currentChat?._id));
  }, [currentChat, arrivalMessage]);

  useEffect(() => {
    if (message) {
      setMessage(message);
    }
  }, [message, currentChat]);

  useEffect(() => {
    socket?.on("getMessage", data => {
      if (data != null) {
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          createdAt: Date.now()
        })
      }
    })

    socket?.on("userTyping", data => {
      setTyping(data.flag);
      setTypingUser(data.me)

    })
  }, [socket])

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage?.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const sendSocketMessage = (senderId, receivedId, text) => {
    socket?.emit("sendMessage", {
      senderId, receivedId, text,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendSocketMessage(me?._id, receivedId, newMessage);
    const msg = {
      sender: me?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    }
    setTyping((prev) => !prev);
    dispatch(sendMessage(msg));
    setNewMessage("");
  }

  useEffect(() => {
    let a = 0;
    scollRef.current?.scrollIntoView({ behavior: "smooth" });
    a++;
    console.log(a);
    dispatch(getSender(receivedId));
  }, [currentChat]);


  const handleChange = () => {
    socket?.emit("typing", { me })
    setTyping((prev) => !prev);
  }
  return (
    <div className='rightSide'>
      <div class="content">
        <div class="container p-0">
          <h1 class="h3 mb-3" style={{ textAlign: "center", color: "#1a1a17ab" }}>Messages</h1>
          <div class="card">
            <div class="row g-0">
              {
                currentChat ? (

                  <div class="col-12 col-lg-7 col-xl-9 chatBox">
                    <div class="py-2 px-4 border-bottom d-none d-lg-block">
                      <div class="d-flex align-items-center py-1 header_dabba">
                        <div class="position-relative">
                          <img src={seder?.image.url || avatar} class="rounded-circle mr-1 header_img" alt="Sharon Lessman" />
                        </div>
                        <div className='header_bar'>
                          <div class="flex-grow-1 pl-3" style={{ marginLeft: "5px", marginRight: "9px" }}>
                            {/* <strong>Aman</strong> */}
                            <strong>{seder?.username}</strong>
                            <div class="text-muted small"><em>{typing && (typingUser?._id !== me?._id) ? "Typing..." : ""}</em></div>
                          </div>
                          <div className='header_btn'>
                            <button class="btn btn-primary btn-lg mr-1 px-3 svg boxes"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
                            <button class="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block svg boxes"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
                            <button class="btn btn-light border btn-lg px-3 svg boxes"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal feather-lg"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="position-relative">
                      <div class="chat-messages p-4">
                        {
                          mesage.map((item) => {
                            return item?.sender?._id === me._id ? (
                              <div class="chat-message-right pb-4" ref={scollRef}>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                  <div class="font-weight-bold mb-1">{item?.text}</div>
                                </div>
                                <div>
                                  <div class="text-muted small text-nowrap mt-2"><span style={{ fontSize: "x-small", color: "#9e7272" }}>{moment(item.createdAt).fromNow()}</span></div>
                                </div>
                              </div>
                            ) : (
                              <div class="chat-message-left pb-4" ref={scollRef} style={{ position: "relative" }}>
                                <div>
                                  <img src={seder?.image.url || avatar} class="rounded-circle mr-1 sender_img" alt="Sharon Lessman" width="30" height="30" />
                                </div>
                                <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                  <div class="font-weight-bold mb-1">{item?.text}</div>
                                </div>
                                <div>
                                  <div class="text-muted small text-nowrap mt-2"><span style={{ fontSize: "x-small", color: "#9e7272" }}>{moment(item.createdAt).fromNow()}</span></div>
                                </div>
                              </div>
                            );
                          })
                        }
                      </div>
                    </div>

                    <div class="flex-grow-0 py-3 px-4 border-top sender">
                      <div class="input-group">
                        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                          <input type="text" className="form-control" placeholder="Type your message" onChange={(e) => { setNewMessage(e.target.value); handleChange(e) }} value={newMessage} />
                          <button type="submit" className='send'><i class="far fa-paper-plane"></i></button>
                        </form>
                      </div>
                    </div>

                  </div>
                ) : (
                  <h2 className='left_alone'>Start Converstions !!</h2>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatRight