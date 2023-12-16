import axios from "axios";

const API=axios.create({baseURL:'http://localhost:4000'});;

export const createPost=(formData)=>API.post('/api/post/createPost',formData,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});
export const getAllpost=(num)=>API.get(`/api/post/allpost?count=${num}`,{
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

export const getMyPosts=(id)=>API.get(`/api/post/getOwnPost/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const deletePost=(id)=>API.get(`/api/post/deletePost/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})
export const allUserLks=(id)=>API.get(`/api/post/allLikes/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const allCmts=(id)=>API.get(`/api/post/allCmts/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})