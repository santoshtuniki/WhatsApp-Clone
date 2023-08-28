// module imports
import moment from 'moment';

// component imports
import TraingleIcon from '../../../svg/triangle';

function Message({ message, me }) {
    return (
        <div className={`w-full flex mt-2 space-x-3 max-w-xs ${me ? "ml-auto justify-end" : ""}`} >
            {/*Message Container*/}
            <div className='relative'>
                {/* sender user message */}
                <div className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${me ? "bg-green_3" : "dark:bg-dark_bg_2"}`} >
                    {/*Message*/}
                    <p className='float-left h-full text-sm pb-4 pr-8'>
                        {message.message}
                    </p>
                    {/*Message Date*/}
                    <span className="absolute right-1.5 bottom-1.5 text-xs text-dark_text_5 leading-none">
                        {moment(message.createdAt).format("HH:mm")}
                    </span>
                    {/*Traingle*/}
                    {
                        !me ? (
                            <span>
                                <TraingleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
                            </span>
                        ) : (
                            <span>
                                <TraingleIcon className="dark:fill-green_3 rotate-[60deg] absolute top-[-5px] -right-2.5" />
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

// Default export
export default Message;