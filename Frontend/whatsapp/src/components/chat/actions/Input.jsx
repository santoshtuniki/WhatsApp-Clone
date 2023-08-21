// module imports
import { useState, useContext } from "react";
import { useSelector } from "react-redux";

// component imports
import SocketContext from "../../../context/SocketContext";

function Input({ message, setMessage, textRef }) {
    // context
    const socket = useContext(SocketContext);

    // Redux
    const { activeConversation } = useSelector((state) => state.chat);

    const [typing, setTyping] = useState(false);

    const inputHandler = (e) => {
        setMessage(e.target.value);
        if (!typing) {
            setTyping(true);
            socket.emit('typing', activeConversation._id);
        }

        const lastTypingTime = new Date().getTime();
        const timer = 2000;
        setTimeout(() => {
            const timeNow = new Date().getTime();
            const timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timer && timer) {
                socket.emit('stop typing', activeConversation._id);
                setTyping(false);
            }
        }, timer);
    }

    return (
        <div className='w-full'>
            <input
                type='text'
                className='dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4'
                placeholder='Type a message'
                value={message}
                onChange={inputHandler}
                ref={textRef}
            />
        </div>
    )
}

// Default import
export default Input;