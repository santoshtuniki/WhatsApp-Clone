// module imports
import { useSelector } from 'react-redux';

// component imports
import { SearchLargeIcon, DotsIcon, VideoCallIcon, CallIcon } from '../../../svg';
import capitalize from '../../../utils/string';
import { getConversationPicture, getConversationName } from '../../../utils/chat';

function ChatHeader({ online, callUser }) {
    // Redux
    const { activeConversation } = useSelector((state) => state.chat);
    const { name, picture } = activeConversation;

    const { user } = useSelector((state) => state.user);

    return (
        <div className='h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none'>
            {/*Container*/}
            <div className='w-full flex items-center justify-between'>
                {/*left*/}
                <div className='flex items-center gap-x-4'>
                    {/*Conversation image*/}
                    <button className='btn'>
                        <img
                            src={
                                activeConversation.isGroup
                                    ? activeConversation.picture
                                    : getConversationPicture(user, activeConversation.users)
                            }
                            alt=''
                            className='w-full h-full rounded-full object-cover'
                        />
                    </button>

                    {/*Conversation name and online status*/}
                    <div className="flex flex-col">
                        <h1 className="dark:text-white text-md font-bold">
                            {
                                activeConversation.isGroup
                                    ? activeConversation.name
                                    : capitalize(getConversationName(user, activeConversation.users).split(' ')[0])
                            }
                        </h1>
                        <span className="text-xs dark:text-dark_svg_2">
                            {online ? 'online' : ''}
                        </span>
                    </div>
                </div>

                {/* right */}
                <ul className="flex items-center gap-x-2.5">
                    {
                        1 == 1 ? (
                            <li onClick={() => callUser()}>
                                <button className="btn">
                                    <VideoCallIcon />
                                </button>
                            </li>
                        ) : null
                    }
                    {
                        1 == 1 ? (
                            <li>
                                <button className="btn">
                                    <CallIcon />
                                </button>
                            </li>
                        ) : null
                    }
                    <li>
                        <button className="btn">
                            <SearchLargeIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                    <li>
                        <button className="btn">
                            <DotsIcon className="dark:fill-dark_svg_1" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

// Default export
export default ChatHeader;