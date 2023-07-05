import { configureStore } from "@reduxjs/toolkit";
import { allUserReducer, editProfileReducer, profileReducer, searchReducer, userMessageReducer, userReducer } from "./reducers/AuthReducers";
import { allMessageReducer, allPostReducer, myPostReducer, postReducer } from "./reducers/PostReducers";

const store=configureStore({
	reducer:{
		user:userReducer,
		mypost:postReducer,
		allPost:allPostReducer,
		allMessage:allMessageReducer,
		userMessage:userMessageReducer,
		allUsers:allUserReducer,
		profile:profileReducer,
		myPosts:myPostReducer,
		editedProfile:editProfileReducer,
		searchQuery:searchReducer,

	}
})

export default store