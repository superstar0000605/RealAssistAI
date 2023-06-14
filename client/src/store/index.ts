import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
    TypedUseSelectorHook,
    useSelector
} from "react-redux";
import chatReducer from "./slices/chatSlice/chatSlice";

export const store = configureStore({
    reducer: {
        chat: chatReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
