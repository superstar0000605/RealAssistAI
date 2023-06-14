import SubscribeIcon from '../resources/icons/subscribe';
interface MainFormProps {
    message: string;
    setMessage: (message: string) => void;
    handleMessageSubmit: () => void;
}
const MainForm = ({ setMessage, handleMessageSubmit, message }: MainFormProps) => {
    return (
        <div className="grid w-full grid-cols-12 gap-3">
            <textarea rows ={3} placeholder = 'Please type here' onChange={(e) => setMessage(e.target.value)} value={message} className="col-span-11 px-4 rounded-[12px] py-2" />
            <div className="flex justify-center col-span-1">
                <button onClick={handleMessageSubmit}><SubscribeIcon /></button>
            </div>
        </div>
    )
}

export default MainForm