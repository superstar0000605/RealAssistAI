import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, RootState } from '../../store';
import { addContent, getChats, createChat } from '../../store/slices/chatSlice/chatSlice';
import ChatHome from './ChatHome';
import ChatBox from './ChatBox';
import ChatForm from '../../components/ChatForm';
import MainForm from '../../components/MainForm';
import { ContentType } from '../../global.types'
import { useGlobalContext } from './MyGlobalContext'
const { Configuration, OpenAIApi } = require("openai");

const CreateChat = () => {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const { chat, chats, isNewChat } = useSelector((state: RootState) => state.chat);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [bloading, setBloading] = useState(false);
    const [mloading, setMloading] = useState(false);
    const { chatId, setChatId, companyName, setCompanyName, chatContent, setChatContent, companyDescription } = useGlobalContext();
    const id = useParams().id;
    const openai = new OpenAIApi(configuration);
    const statement = `You are a business consultant. I have a company name and description.
    I am looking to develop a business plan, legal structure, and marketing strategy for my company. 
    Anything in parentheses () signifies the company name. Anything in curly braces {} signifies the company description.
     (${companyName}) is {${companyDescription}}. I need advice and guidance on how to set up this business, 
     what legal structure to choose, and the best marketing strategy to help this business succeed.
      Please provide me with insight and advice on the best options for achieving my goals.`;
    const contents: ContentType[] = [{
        _id: '',
        usercontent: companyName,
        aicontent: chatContent,
        companyname: companyName,
        companydescription: companyDescription,
    }]
    useEffect(() => {
        dispatch(getChats())

    }, [dispatch])
    useEffect(() => {
        chatContent && navigate('/' + chats[chats.length - 1]._id);
    }, [chats])
    const viewBusiness = async () => {
        const businessStatement = `You are a business consultant.To detailed Go to business plan for ${companyDescription}.`
        const prompt = `You: ${businessStatement}\n`;
        setBloading(true);
        const result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 2048,
        });
        const { text } = result.data.choices[0];
        setChatContent(text);
        const data = {
            name: companyName + "'s business plan",
            contents: [
                {
                    aicontent: text,
                    usercontent: prompt,
                    companyname: companyName,
                    companydescription: companyDescription,
                }
            ]
        }
        dispatch(createChat(data))
    }
    const viewMarketing = async () => {
        const marketingStatement = `You are a business consultant. Please create a detailed market strategy for ${companyDescription}.`
        const prompt = `You: ${marketingStatement}\n`;
        setMloading(true);
        const result = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.5,
            max_tokens: 2048,
        });
        const { text } = result.data.choices[0];
        setChatContent(text);
        const data = {
            name: companyName + "'s marketing plan",
            contents: [
                {
                    aicontent: text,
                    usercontent: prompt,
                    companyname: companyName,
                    companydescription: companyDescription,
                }
            ]
        }
        dispatch(createChat(data))
    }

    return (
        <div className='flex flex-col justify-between flex-grow h-[500px]'>
            <div className="h-full pt-8 pb-4 overflow-auto">
                <ChatBox contents={contents} />
            </div>
            <div className="px-12 flex justify-center my-12">
                <button onClick={viewBusiness} className="mx-12 px-16 py-1 border rounded-lg w-max bg-red-500 hover:bg-red-700 text-white">
                    business plan 
                    {bloading && <div className="px-[30px] py-2 text-[#555B67]">
                        <div className="pulse-container">
                            <div className="pulse-bubble pulse-bubble-1"></div>
                            <div className="pulse-bubble pulse-bubble-2"></div>
                            <div className="pulse-bubble pulse-bubble-3"></div>
                        </div>
                    </div>}
                </button>
                <button onClick={viewMarketing} className="mx-12 px-16 py-1 border rounded-lg w-max bg-red-500 hover:bg-red-700 text-white">
                    marketing plan
                    {mloading && <div className="px-[30px] py-2 text-[#555B67]">
                        <div className="pulse-container">
                            <div className="pulse-bubble pulse-bubble-1"></div>
                            <div className="pulse-bubble pulse-bubble-2"></div>
                            <div className="pulse-bubble pulse-bubble-3"></div>
                        </div>
                    </div>}
                </button>
                {/* <MainForm handleMessageSubmit={handleMessageSubmit} setMessage={setMessage} message={message} /> */}
            </div>
        </div>

    )
}

export default CreateChat;