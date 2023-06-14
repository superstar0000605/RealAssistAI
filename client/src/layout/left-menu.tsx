import { useSelector } from "react-redux";
import React, { useState, useEffect, createContext, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../store";
import { getChat, setIsNewChat } from "../store/slices/chatSlice/chatSlice";
import { Delete } from "../icons/Delete";
const LeftMenu = () => {
    const { chat,chats } = useSelector((state: RootState) => state.chat);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleGetChat = (id: any) => {
        dispatch(getChat(id));
        const path = "/" + id;
        navigate(path)
    }
    const handleNewChat = () => {
        dispatch(setIsNewChat(true));
        navigate("/");
    }
    // useEffect(() => {
    //     console.log(chat._id);
    // }, [chat])
    
    return (
        <div className='flex flex-col justify-between text-white w-80 bg-[#0F1C35]'>
            <ul className="flex flex-col gap-2 py-8">
                <li className="px-8">
                    <button onClick={handleNewChat} className="px-16 py-1 border rounded-lg w-max">
                        New Chat
                    </button>
                </li>
            </ul>
            <ul className="flex flex-col gap-2 mt-4 overflow-auto">
                {
                    chats.map((chat) => (
                        <li key={chat._id} onClick={() => handleGetChat(chat._id)} className="bg-[#D9D9D9]/10 px-8 py-2 flex justify-between hover:cursor-pointer">
                                {chat.name}
                            {/* <button onClick={}><Delete /></button> */}
                        </li>
                    ))
                }
            </ul>
            <ul className="px-8 py-4 space-y-6 border-t">
                <li>
                    <Link to="/account">
                        Account
                    </Link>
                </li>
                <li>
                    <Link to="/contact-us">
                        Contact Us
                    </Link>
                </li>
                <li>
                    <button className="px-16 py-1 text-black bg-white border rounded-lg">
                        Log Out
                    </button>
                </li>

            </ul>
        </div >
    )
}

export default LeftMenu;