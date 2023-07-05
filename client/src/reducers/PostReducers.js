import {createReducer} from '@reduxjs/toolkit'
const intialState={};

export const postReducer=createReducer(intialState,{
	CreatePostRequest:(state)=>{
		state.loading=true;
	},
	CreatePostSuccess:(state,action)=>{
		state.loading=false;
		state.post=action.payload.post
	},
	CreatePostFailure:(state,action)=>{
		state.loading=false;
		state.error=action.payload;
	},

})
export const allPostReducer=createReducer(intialState,{
	GetAllPostRequest:(state)=>{
		state.loading=true;
	},
	GetAllPostSuccess:(state,action)=>{
		state.loading=false;
		state.posts=action.payload.posts;
	},
	GetAllPostFailure:(state,action)=>{
		state.loading=false;
		state.error=action.payload;
	}
})

export const allMessageReducer=createReducer(intialState,{
	LikeUnlikeRequest:(state)=>{
		state.loading=true;
	},
	LikeUnlikeSuccess:(state,action)=>{
		state.loading=false;
		state.message=action.payload.message;
	},
	LikeUnlikeFailure:(state,action)=>{
		state.loading=false;
		state.error=action.payload;
	},
	CommentRequest:(state)=>{
		state.loading=true;
	},
	CommentSuccess:(state,action)=>{
		state.loading=false;
		state.message=action.payload.message;
	},
	CommentFailure:(state,action)=>{
		state.loading=false;
		state.error=action.payload;
	},
	DeleteRequest:(state)=>{
		state.loading=true;
	},
	DeleteSuccess:(state,action)=>{
		state.loading=false;
		state.message=action.payload.message;
	},
	DeleteFailure:(state,action)=>{
		state.loading=false;
		state.error=action.payload;
	}

})

export const myPostReducer=createReducer(intialState,{
	GetMypostsRequest:(state)=>{
       state.loading=true;
	},
	GetMypostsSuccess:(state,action)=>{
        state.loading=false;
		state.selfPosts=action.payload.ownPosts
	},
	GetMypostsFailure:(state,action)=>{
		state.loading=false;
		state.error=action.payload;
	}
})