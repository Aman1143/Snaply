import axios from 'axios';

const API=axios.create({baseURL:'http://localhost:80'});

export const signUp=(formData)=>API.post('/api/user/register',formData,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});
export const login=(formData)=>API.post('/api/user/login',formData,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});
export const getMe=()=>API.get('/api/user/me',{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});

export const followAndUnFollow=(id)=>API.get(`/api/user/followAndUnFollow/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const getAllUser=()=>API.get(`/api/user/allUser`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const getMyProfile=(id)=>API.get(`/api/user/profile/${id}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})
export const editProfile=(formData)=>API.post('/api/user/editProfile',formData,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})

export const searchFriends=(query)=>API.get(`/api/user/userSearch/?query=${query}`,{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
})
export const logout=()=>API.get('/api/user/logout',{
	headers: {
		Authorization: `JWT ${localStorage.getItem('token') || ""}`
	}
});

export const forgotPassword=(formData)=>API.post('/api/user/password/forgot',formData)
export const resetPassword=(token,password)=>API.put(`/api/user/password/reset/${token}`,password)