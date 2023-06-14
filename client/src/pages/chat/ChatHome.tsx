import ArrowUpRight from "../../resources/icons/arrow-up-right";
import Close from '../../resources/icons/close';
interface SubscribeProps {
    isModal: Boolean,
    onClose: VoidFunction
}
const ChatHome = ({ isModal, onClose }: SubscribeProps) => {
    return (
        <div className="px-8 space-y-4">
            <h1 className="text-[26px]">Example of types of question to ask MyStartUp.AI</h1>
            <div className="grid grid-cols-2 gap-1">
                <div className="flex justify-between p-4 bg-white rounded-2xl">
                    learn more about marketing strategy for my company
                    <button><ArrowUpRight /></button>
                </div>
                <div className="flex justify-between p-4 bg-white rounded-2xl">
                    learn more about business plan for my company
                    <button><ArrowUpRight /></button>
                </div>
                <div className="flex justify-between p-4 bg-white rounded-2xl">
                    I need advice and guidance on how to set up my business
                    <button><ArrowUpRight /></button>
                </div>
                <div className="flex justify-between p-4 bg-white rounded-2xl">
                    Writing answers to your clients texts/emails
                    <button><ArrowUpRight /></button>
                </div>
            </div>
            <div className='w-full'>
                <div className={isModal ? "flex justify-end visible" : "invisible"}>
                    <div className="w-[260px]">
                        <div className="relative rounded-t-[20px] bg-logo-mark bg-[#262868] text-white text-[26px] font-manrope pl-4 py-8">
                            Subscribe and Enjoy Full Features
                            <button onClick={() => onClose()} className="absolute -top-2 -right-2">
                                <Close />
                            </button>
                        </div>
                        <div className="text-[#667085] text-[14px] bg-white rounded-b-[20px] pl-4 py-6">
                            <p>
                                With subscription, get over 500,500 words every month
                            </p>
                            <button className="rounded-lg py-[13px] px-[58px] mt-[50px] bg-[#443DF6] text-[16px] text-white">
                                Subscribe Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatHome;