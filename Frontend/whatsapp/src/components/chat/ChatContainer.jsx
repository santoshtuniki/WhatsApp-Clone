// component imports
import { ChatHeader } from './index';

function ChatContainer() {
    return (
        <div className='relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden'>
            {/* Container */}
            <div>
                {/* Chat Header */}
                <ChatHeader />
            </div>
        </div>
    )
}

// Default exports
export default ChatContainer