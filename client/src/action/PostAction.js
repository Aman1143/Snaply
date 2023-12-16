import * as PostApi from '../api/PostRequest.js'

export const createPost = (formData, navigate) => async (dispatch) => {
	dispatch({ type: "CreatePostRequest" });
	try {
		const { data } = await PostApi.createPost(formData);
		console.log(data);
		dispatch({ type: "CreatePostSuccess", payload: data });
		navigate('../', { replace: true });
	} catch (error) {
		console.log(error)
		dispatch({ type: "CreatePostFailure", payload: error.response.data.message });
	}
}

export const getAllpost = (num) => async (dispatch) => {
	dispatch({ type: "GetAllPostRequest" });
	try {
		const { data } = await PostApi.getAllpost(num);
		if(data.success){
		dispatch({ type: "GetAllPostSuccess", payload: data });
		}else{
			dispatch({ type: "GetAllPostFailure", payload: data.message });
		}
	} catch (error) {
		dispatch({ type: "GetAllPostFailure", payload: error.response.data.message });
	}
}



export const likeUnlike = (id) => async (dispatch) => {
	dispatch({ type: "LikeUnlikeRequest" });
	try {
		const { data } = await PostApi.likeUnlike(id);
		dispatch({ type: "LikeUnlikeSuccess", payload: data });

	} catch (error) {
		console.log(error)
		dispatch({ type: "LikeUnlikeFailure", payload: error.response.data.message });
	}
}

export const addComment = (id, comment) => async (dispatch) => {
	dispatch({ type: "CommentRequest" });
	try {
		const { data } = await PostApi.addComment(id, comment);
		dispatch({ type: "CommentSuccess", payload: data });
	} catch (error) {
		console.log(error)
		dispatch({ type: "CommentFailure", payload: error.response.data.message });
	}
}

export const getMyPosts = (id) => async (dispatch) => {
	dispatch({ type: "GetMypostsRequest" });
	try {
		const { data } = await PostApi.getMyPosts(id);
		dispatch({ type: "GetMypostsSuccess", payload: data });
	} catch (error) {
		console.log(error)
		dispatch({ type: "GetMypostsFailure", payload: error.response.data.message });
	}
}


export const deletePost = (id, navigate) => async (dispatch) => {
	dispatch({ type: "DeleteRequest" });
	try {
		const { data } = await PostApi.deletePost(id);
		if(data.success){
			dispatch({ type: "DeleteSuccess", payload: data });
			navigate('../', { replace: true });
		}else{
			dispatch({ type: "DeleteFailure", payload:data.message });
		}
	} catch (error) {
		dispatch({ type: "DeleteFailure", payload: error.response.data.message });
	}
}

export const allUserLks=(id)=>async(dispatch)=>{
	dispatch({type:"AllUserLksRequest"});
	try {
		const {data}=await PostApi.allUserLks(id);
		dispatch({type:"AllUserLksSuccess",payload:data.flattenedLikes});
	} catch (error) {
		dispatch({type:"AllUserLksFailure",payload:error.response.data.message})
	}
}

export const allCmts=(id)=>async(dispatch)=>{
	dispatch({type:"AllUserCmtsRequest"});
	try {
		const {data}=await PostApi.allCmts(id);
		dispatch({type:"AllUserCmtsSuccess",payload:data.arr});
	} catch (error) {
		dispatch({type:"AllUserCmtsFailure",payload:error.response.data.message});
	}
}