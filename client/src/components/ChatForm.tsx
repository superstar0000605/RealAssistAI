import SubscribeIcon from '../resources/icons/subscribe';
interface ChatFormProps {
    name: string;
    message: string;
    setName: (name: string) => void;
    setMessage: (message: string) => void;
    handleMessageSubmit: () => void;
}
const ChatForm = ({ setMessage,setName, handleMessageSubmit, message, name }: ChatFormProps) => {
    return (
        <div className="grid w-full grid-cols-12 gap-3">
            <input type="text" placeholder='company name' onChange={(e) => setName(e.target.value)} value={name} className="col-span-4 px-4 rounded-[12px] py-2" />
            <textarea rows ={5} placeholder = 'company description' onChange={(e) => setMessage(e.target.value)} value={message} className="col-span-11 px-4 rounded-[12px] py-2" />
            <div className="flex justify-center col-span-1">
                <button onClick={handleMessageSubmit}><SubscribeIcon /></button>
            </div>
        </div>
    )
}

export default ChatForm