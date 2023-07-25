import { createReducer } from '@reduxjs/toolkit'
const intialState = {};


export const userReducer = createReducer(intialState, {
    RegisterRequest: (state) => {
        state.loading = true;
    },
    RegisterSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        state.isAuthenticated = true;
    },
    RegisterFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    LoginRequest: (state) => {
        state.loading = true;
    },
    LoginSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        state.isAuthenticated = true;
    },
    LoginFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    LogoutRequest: (state) => {
        state.loading = true;
    },
    LogoutSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    LogoutFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    ForgotPasswordRequest: (state) => {
        state.loading = true;
    },
    ForgotPasswordSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
    },
    ForgotPasswordFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    ResetPasswordRequest:(state)=>{
        state.loading=true;
    },
    ResetPasswordSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;
        state.isAuthenticated=true;
    },
    ResetPasswordFailure:(state,action)=>{
        state.loading=false;
        state.isAuthenticated=false;
        state.error=action.payload;
    },

})

export const userMessageReducer = createReducer(intialState, {
    followAndUnFollowRequest: (state) => {
        state.loading = true;
    },
    followAndUnFollowSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    followAndUnFollowFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const allUserReducer = createReducer(intialState, {
    GetAllUserRequest: (state) => {
        state.loading = true;
    },
    GetAllUserSuccess: (state, action) => {
        state.loading = false;
        state.users = action.payload.users
    },
    GetAllUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const profileReducer = createReducer(intialState, {
    ProfileRequest: (state) => {
        state.loading = true;
    },
    ProfileSuccess: (state, action) => {
        state.loading = false;
        state.self = action.payload.user;
    },
    ProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const editProfileReducer = createReducer(intialState, {
    EditProfileRequest: (state) => {
        state.loading = true;
    },
    EditProfileSuccess: (state, action) => {
        state.loading = false;
        state.editProfile = action.payload.profile;
    },
    EditProfileFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
})

export const searchReducer = createReducer(intialState, {
    SearchRequest: (state) => {
        state.loading = true;
    },
    SearchSuccess: (state, action) => {
        state.loading = false;
        state.person = action.payload.searchedPerson;
    },
    SearchFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    }
}) 

export const meReducers=createReducer(intialState,{
    MeRequest:(state)=>{
        state.loading=true;
    },
    MeSuccess:(state,action)=>{
        state.loading=false;
        state.me=action.payload.me;
    },
    MeFailure:(state,action)=>{
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload;
    }
})