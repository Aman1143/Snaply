import axios from "axios";

const API=axios;

export const createPost=(formData)=>API.post('/api/post/createPost',formData,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});
export const getAllpost=()=>API.get('/api/post/allpost',{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});
export const likeUnlike=(id)=>API.get(`/api/post/likeUnlike/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});
export const addComment=(id,comment)=>API.post(`/api/post/addComment/${id}`,comment,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const getMyPosts=()=>API.get('/api/post/getOwnPost',{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const deletePost=(id)=>API.get(`/api/post/deletePost/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})