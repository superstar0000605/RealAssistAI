import React, { useState, useEffect, createContext, useContext, useRef } from 'react'
import { useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, RootState } from '../../store';
import { addContent, getChats, createChat, getChat } from '../../store/slices/chatSlice/chatSlice';
import ChatHome from './ChatHome';
import ChatBox from './ChatBox';
import ChatForm from '../../components/ChatForm';
import MainForm from '../../components/MainForm';
import { useGlobalContext } from './MyGlobalContext'



const { Configuration, OpenAIApi } = require("openai");
const { toChatML, get_message } = require("gpt-to-chatgpt")
const Chat = () => {

    const navigate = useNavigate();
    
    const configuration = new Configuration({
        apiKey: "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",
    });
    const { chat, chats, isNewChat } = useSelector((state: RootState) => state.chat);
    const dispatch = useAppDispatch();
    const [isModal, setIsModal] = useState(true);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const { companyName, setCompanyName, chatContent, setChatContent, companyDescription, setCompanyDescription, chatMessage, setChatMessage } = useGlobalContext()
    const id: any = useParams().id;
    const openai = new OpenAIApi(configuration);

    useEffect(() => {
        dispatch(getChats())
        id && dispatch(getChat(id));
        
    }, [dispatch])

    const handleMessageSubmit = async () => {

        if (!isNewChat) {
            console.log("content");
            console.log(chat.contents);
            let sentence: string = "";
            chat.contents.map(content => {
                sentence += content.usercontent;
                sentence += content.aicontent;
            });
            console.log(sentence);
            if (!message) {
                alert("Please input message");
                return;
            }
            const prompt = `You: ${message}\n`;
            setChatMessage(prompt);
            // const data = await openai.createChatCompletion({
            //     model: "gpt-3.5-turbo",
            //     messages: toChatML(message),
            //     temperature: 0.7,
            //     max_tokens: 2048,

            // });
            // const text: any = get_message(data.data);
            setMessage('');
            const result = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: sentence + prompt,
                temperature: 0.5,
                max_tokens: 2048,
            });
            console.log(result);

            // result.on('data', (res:any)=>{
            //     console.log(res);
            // })
            // for await (const message of result.data) {
            //     try {
            //       //const parsed = JSON.parse(message);
            //       //const { text } = parsed.choices[0];

            //       console.log(message);
            //     } catch (error) {
            //       console.error("Could not JSON parse stream message", message, error);
            //     }
            //   }

            // 
            const { text } = result.data.choices[0];
            console.log(text);
            if (id) {
                const data = {
                    chatId: id,
                    aicontent: text,
                    usercontent: prompt,
                }
                dispatch(addContent(data));
            } else {
                const data = {
                    name: message,
                    contents: [
                        {
                            aicontent: text,
                            usercontent: message,
                        }
                    ]
                }
                dispatch(createChat(data))
            }
            
            setChatMessage('');
        }
        else {
            if (!description) {
                alert("Please input description");
                return;
            }
            if (!name) {
                alert("Please input company name");
                return;
            }
            setCompanyName(name);
            setCompanyDescription(description);
            setChatContent('');
            navigate('/create');
            // const statement = `You are a business consultant. I have a company name and description. I am looking to develop a business plan, legal structure, and marketing strategy for my company. Anything in parentheses () signifies the company name. Anything in curly braces {} signifies the company description. (${name}) is {${description}}. I need advice and guidance on how to set up this business, what legal structure to choose, and the best marketing strategy to help this business succeed. Please provide me with insight and advice on the best options for achieving my goals.`;
            // const prompt = `You: ${statement}\n`;
            // console.log(statement);
            // const result = await openai.createCompletion({
            //     model: "text-davinci-003",
            //     prompt: prompt,
            //     temperature: 0.5,
            //     max_tokens: 2048,
            // });
            // const { text } = result.data.choices[0];

            // const data = {
            //     name: name,
            //     contents: [
            //         {
            //             aicontent: text,
            //             usercontent: prompt,
            //             companyname: name,
            //             companydescription: description,

            //         }
            //     ]
            // }
            // dispatch(createChat(data))
            // setChatContent(text);
            setName('');
            setDescription('');
        }
    };
    const lo = useLocation()
    const handleCloseModal = () => {

        console.log(lo)
        // setIsModal(false);
    }
    return (
        <div onKeyDown={(e)=>{if(e.key==="Enter" && e.ctrlKey) handleMessageSubmit();}} className='flex flex-col justify-between flex-grow h-[500px]'>
            <div className="h-full pt-8 pb-4 overflow-auto">
                {
                    !isNewChat ? <ChatBox  contents={chat.contents} /> : id ? <ChatBox contents={chat.contents} /> : <ChatHome isModal={isModal} onClose={handleCloseModal} />
                }
            </div>
            <div className="px-12">
                {
                    !id && isNewChat ?
                        <ChatForm handleMessageSubmit={handleMessageSubmit} setMessage={setDescription} message={description} setName={setName} name={name} />
                        : <MainForm handleMessageSubmit={handleMessageSubmit} setMessage={setMessage} message={message} />
                }
            </div>
        </div>

    )
}

export default Chat;