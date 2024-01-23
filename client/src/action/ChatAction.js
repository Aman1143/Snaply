import *as ChatApi from '../api/ChatRequest.js'

export const sendMessage = (formData) => async (dispatch) => {
    dispatch({ type: "SendMessageRequest" });
    try {
        const { data } = await ChatApi.sendMessage(formData);
        dispatch({ type: 'SendMessageSuccess', payload: data });

    } catch (error) {
        dispatch({ type: "SendMessageFailure", payload: error.response.data.message });
    }
}

export const getMessage = (id) => async (dispatch) => {
    dispatch({ type: "GetMessageRequest" });
    try {
        const { data } = await ChatApi.getMessage(id);
        // console.log("message");
        //  console.log(data);
        dispatch({ type: 'GetMessageSuccess', payload: data.mesage });
    } catch (error) {
        dispatch({ type: "GetMessageFailure", payload: error.response.data.message });
    }
}

export const getSender = (id) => async (dispatch) => {
    dispatch({ type: "GetSenderRequest" });
    try {
        const { data } = await ChatApi.getSender(id);
        // console.log("kjdhglghl");
        // console.log(data);
        dispatch({ type: "GetSenderSuccess", payload: data.user });
    } catch (error) {
        dispatch({ type: "GetSenderFailure", payload: error.response.data.message });
    }
}

export const getConversations = (conversationId) => async (dispatch) => {
    dispatch({ type: "GetConverRequest" });
    try {
        const { data } = await ChatApi.getConversations(conversationId);
        dispatch({ type: "GetConverSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "GetConverFailure", payload: error.response.data.message });
    }
}

export const createChat = (receivedId) => async (dispatch) => {
    dispatch({ type: "CreateChatRequest" });
    try {
        const { data } = await ChatApi.createChat(receivedId);
        dispatch({ type: "CreateChatSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "CreateChatFailure", payload: error.response.data.message });
    }
}

export const getFriends = (id) => async (dispatch) => {
    dispatch({ type: "GetFriendsRequest" });
    try {
        const { data } = await ChatApi.getFriends(id);
        dispatch({ type: "GetFriendsSuccess", payload: data });
    } catch (error) {
        dispatch({ type: "GetFriendsFailure", payload: error.response.data.message });
    }
}