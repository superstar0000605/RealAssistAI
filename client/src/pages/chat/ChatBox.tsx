
import { ContentType } from "../../global.types";
import { useGlobalContext } from './MyGlobalContext'
import React, { useState, useEffect, createContext, useContext, useRef } from 'react'

interface ChatBoxProps {
    contents: ContentType[];
}
const ChatBox = ({ contents }: ChatBoxProps) => {
    const { chatMessage } = useGlobalContext();
    const dummy: any = useRef();
    useEffect(() => {
        dummy?.current?.scrollIntoView(true, {
            behaviour: "auto",
        });
    }, [contents, chatMessage])

    return (
        <div className="space-y-2">
            <p className="bg-white/50 px-[30px] py-2 text-[#555B67]">
                Hey, this is MyStartup.AI, How can I help you?
            </p>
            {
                contents.map(content => (
                    <div ref={dummy} className="space-y-1" key={content._id}>
                        <div className="bg-white/50 px-[30px] py-2 text-[#555B67]">
                            <p className="text-[13px]">
                                {content.companyname ? "You: " + content.companyname : content.usercontent}
                            </p>
                            {/* <p className="text-[9px] pt-2">
                                {content.date}
                            </p> */}
                        </div>
                        <div className="bg-white/50 px-[30px] py-2 text-[#555B67] text-sm">
                            {content.aicontent}
                        </div>
                    </div>
                ))
            }
            {chatMessage &&
                <div ref={dummy}>
                    <div className="bg-white/50 px-[30px] py-2 text-[#555B67]">
                        <p className="text-[13px]">{chatMessage}</p>
                        <div className="pulse-container">
                            <div className="pulse-bubble pulse-bubble-1"></div>
                            <div className="pulse-bubble pulse-bubble-2"></div>
                            <div className="pulse-bubble pulse-bubble-3"></div>
                        </div>
                    </div>

                </div>
            }

        </div>

    )
}

export default ChatBox;