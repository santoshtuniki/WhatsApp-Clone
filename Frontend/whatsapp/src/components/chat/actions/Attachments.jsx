// component imports
import { AttachmentIcon } from '../../../svg';

function Attachments() {
    return (
        <li className='relative'>
            <button className='btn'>
                <AttachmentIcon className='dark:fill-dark_svg_1' />
            </button>
        </li>
    )
}

// Default export
export default Attachments;