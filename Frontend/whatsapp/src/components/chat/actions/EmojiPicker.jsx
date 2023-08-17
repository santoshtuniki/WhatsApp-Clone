// module imports
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';

// component imports
import { EmojiIcon, CloseIcon } from '../../../svg';

function EmojiPickerApp({ textRef, message, setMessage }) {
    const [showPicker, setShowPicker] = useState(false);
    const [cursorPosition, setCursorPosition] = useState();

    // componentDidUpdate
    useEffect(() => {
        textRef.current.selectionEnd = cursorPosition;
    }, [cursorPosition]);

    const handleEmoji = (emojiData, e) => {
        const { emoji } = emojiData;
        const ref = textRef.current;
        ref.focus();

        const start = message.substring(0, ref.selectionStart);
        const end = message.substring(ref.selectionStart);
        const newText = start + emoji + end;
        setMessage(newText);

        setCursorPosition(start.length + emoji.length);
    }

    return (
        <li className='w-full'>
            <button className='btn' type='button' onClick={() => setShowPicker((prev) => !prev)}>
                {
                    showPicker ? (
                        <CloseIcon className="dark:fill-dark_svg_1" />
                    ) : (
                        <EmojiIcon className="dark:fill-dark_svg_1" />
                    )
                }
            </button>
            {/*Emoji picker*/}
            {
                showPicker && (
                    <div className='openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full'>
                        <EmojiPicker theme='dark' onEmojiClick={handleEmoji} />
                    </div>
                )
            }
        </li>
    )
}

// Default export
export default EmojiPickerApp;