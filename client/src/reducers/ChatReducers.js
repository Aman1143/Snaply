import { createReducer } from '@reduxjs/toolkit'
const intialState = {};

export const sendMessageReducer = createReducer(intialState, {
    SendMessageRequest: (state) => {
        state.loading = true;
    },
    SendMessageSuccess: (state, action) => {
        state.loading = false;
        // state.message = action.payload.message;
    },
    SendMessageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const getMessageReducer = createReducer(intialState, {
    GetMessageRequest: (state) => {
        state.loading = true;
    },
    GetMessageSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    GetMessageFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const getSenderReducer = createReducer(intialState, {
    GetSenderRequest: (state) => {
        state.loading = true;
    },
    GetSenderSuccess: (state, action) => {
        state.loading = false;
        state.seder = action.payload;
    },
    GetSenderFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const getConversationsReducer = createReducer(intialState, {
    GetConverRequest: (state) => {
        state.loading = true;
    },
    GetConverSuccess: (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
    },
    GetConverFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const createChatReducer = createReducer(intialState, {
    CreateChatRequest: (state) => {
        state.loading = false;
    },
    CreateChatSuccess: (state, action) => {
        state.loading = false;
        // state.
    },
    CreateChatFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const getFriendsReducer = createReducer(intialState, {
    GetFriendsRequest: (state) => {
       state.loading=true;
    },
    GetFriendsSuccess: (state,action) => {
     state.loading=false;
     state.friends=action.payload;
    },
    GetFriendsFailure: (state,action) => {
      state.loading=false;
      state.error=action.payload;
    }
})