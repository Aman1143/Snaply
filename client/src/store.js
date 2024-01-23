import { configureStore } from "@reduxjs/toolkit";
import { allUserReducer, editProfileReducer, meReducers, profileReducer, searchReducer, userMessageReducer, userReducer } from "./reducers/AuthReducers";
import { allMessageReducer, allPostReducer, myPostReducer, postReducer, userCmtsReducer, userLksReducer } from "./reducers/PostReducers";
import { getConversationsReducer, getFriendsReducer, getMessageReducer, getSenderReducer } from "./reducers/ChatReducers";

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
		meUser:meReducers,
		allUserlkes:userLksReducer,
        userComment:userCmtsReducer,
		userMessage:getMessageReducer,
		getSenDer:getSenderReducer,
		getConversation:getConversationsReducer,
		getFriEnds:getFriendsReducer,
	}
})

export default store