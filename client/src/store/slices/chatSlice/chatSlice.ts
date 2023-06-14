import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { chatSliceState } from "./types";
import { ChatType, ContentType } from "../../../global.types";
import { api } from "../../../api/api";
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { useGlobalContext } from '../../../pages/chat/MyGlobalContext';

const initialState: chatSliceState = {
    chats: [],
    chat: {
        name: "",
        contents: []
    },
    isNewChat: true
};
export const getChats = createAsyncThunk<ChatType[]>("chat/all", async () => {
    const result = await api.get("chat/all");
    return result.data;
})

export const createChat = createAsyncThunk<ChatType, ChatType>("chat/create", async (data) => {
   
    const result = await api.post("/chat/create", data);
    // const { chatId, setChatId} = useGlobalContext();
    // setChatId(result.data._id);
    // const path = "/" + result.data._id;
    // useNavigate()(path);
    return result.data;
})
export const addContent = createAsyncThunk<ChatType, ContentType>("content/add", async (data) => {
    const result = await api.post("/chat/content/add", data)
    return result.data;
})
export const getChat = createAsyncThunk<ChatType, string>("chat/id", async (id) => {
    const result = await api.get(`/chat/${id}`);
    return result.data;
})

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setIsNewChat(state, action: PayloadAction<Boolean>) {
            state.isNewChat = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getChats.fulfilled, (state, { payload }) => {
            state.chats = payload;
            state.isNewChat = true;
        })
        builder.addCase(createChat.fulfilled, (state, { payload }) => {
            state.chats = [...state.chats, payload];
            state.isNewChat = false;
        })
        builder.addCase(getChat.fulfilled, (state, {payload}) => {
            state.chat = payload;
            state.isNewChat = false;
        })
        builder.addCase(addContent.fulfilled, (state, {payload}) => {
            state.chat = payload;
            state.isNewChat = false;
        })
    }
});
export const { setIsNewChat } = chatSlice.actions;
export default chatSlice.reducer;




