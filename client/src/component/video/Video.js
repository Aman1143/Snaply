import React, { useEffect, useRef,useState } from 'react'
import Peer from 'peerjs'
import './Video.css'
const Video = ({ socket, me, sender }) => {

	const videoGridRef = useRef(null);
	const myPeer = useRef(null);
	const myVideo = useRef(null);
	const [roomId, setRoomId] = useState(1);

	useEffect(() => {
       console.log(me);
		myPeer.current = new Peer();
		myVideo.current = document.createElement('video');
		myVideo.current.muted = true;

		navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		}).then(stream => {
			addVideoStream(myVideo.current, stream);
			myPeer.current.on('call', call => {
				console.log(call);
				call.answer(stream);
				const video = document.createElement('video');
				call.on('stream', userVideoStream => {
					addVideoStream(video, userVideoStream);
				})
			})
			socket.on('user-connected', me=> {
	    connectToNewuser(me, stream);
      });
		});
		myPeer.current.on('open', id => {
			socket.emit('join-room', roomId, id);
		});

		return () => {
			socket.disconnect();
			myPeer.current.destroy();
		};
	}, [])

const connectToNewuser = (me, stream)=> {
	const call = myPeer.current.call(me, stream);
	const video = document.createElement('video');
	call.on('stream', userVideoStream => {
		addVideoStream(video, userVideoStream);
	});
	call.on('close', () => {
		video.remove();
	});
}


const addVideoStream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener('loadedmetadata', () => {
		video.play();
	});
	videoGridRef.current.append(video);
};


return (
	<div className="video_main" >
		<p className='headline'>Welcome to Instaclone</p>
		<div id="video-grid" ref={videoGridRef}></div>
	</div>
)
}

export default Video