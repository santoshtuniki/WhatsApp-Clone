// module imports

// component imports
import { ReturnIcon } from '../../../../svg';
import { UnderlineInput } from './index';

function CreateGroup({ setShowCreateGroup }) {

	const [name, setName] = useState('');

	return (
		<div className='createGroupAnimation relative flex0030 h-full z-40'>
			{/*Container*/}
			<div className='mt-5'>
				{/*Return/Close button*/}
				<button
					className='btn w-6 h-6 border'
					onClick={() => setShowCreateGroup(false)}
				>
					<ReturnIcon className='fill-white' />
				</button>

				{/*Group name input*/}
				<UnderlineInput name={name} setName={setName} />
			</div>
		</div>
	)
}

// Default export
export default CreateGroup