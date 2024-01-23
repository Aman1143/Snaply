import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:4000' });

export const sendMessage = (formData) => API.post('/api/chat/message', formData, {
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});

export const getMessage = (conversationId) => API.get(`/api/chat/message/${conversationId}`, {
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});

export const getSender = (id) => API.get(`/api/chat/sender/${id}`, {
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const getConversations = (userId) => API.get(`/api/chat/chats/${userId}`, {
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});

export const createChat = (receivedId) => API.post(`/api/chat/chats`, receivedId, {
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});

export const getFriends = async (id) => API.get(`/api/chat/friends/${id}`, {
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});