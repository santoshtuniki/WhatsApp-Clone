// module imports
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ClipLoader } from 'react-spinners';

// component imports
import { ReturnIcon, ValidIcon } from '../../../../svg';
import { UnderlineInput, MultipleSelect } from './index';
import { searchService } from '../../../../services/searchService';
import { createGroupConversation } from '../../../../features/chatSlice';

function CreateGroup({ setShowCreateGroup }) {
	// UnderlineInput states
	const [name, setName] = useState('');

	// MultipleSelect states
	const [searchResults, setSearchResults] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);

	// Redux
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	const { status } = useSelector((state) => state.chat);
	const dispatch = useDispatch();

	// search function
	const handleSearch = async (e) => {
		if (e.target.value && e.key === 'Enter') {
			setSearchResults([]);
			const response = await searchService(token, e.target.value);
			if (response.length > 0) {
				let tempArray = [];
				response.forEach((user) => {
					let temp = {
						value: user._id,
						label: user.name,
						picture: user.picture,
					};
					tempArray.push(temp);
				});
				setSearchResults(tempArray);
			} else {
				setSearchResults([]);
			}
		} else {
			setSearchResults([]);
		}
	};

	// createGroup function
	const createGroupHandler = async () => {
		if (status !== 'loading') {
			let users = [];
			selectedUsers.forEach((user) => {
				users.push(user.value);
			});

			let values = {
				name,
				users,
				token,
			};
			let newConvo = await dispatch(createGroupConversation(values));

			setShowCreateGroup(false);
		}
	};

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

				{/*Multiple select */}
				<MultipleSelect
					selectedUsers={selectedUsers}
					searchResults={searchResults}
					setSelectedUsers={setSelectedUsers}
					handleSearch={handleSearch}
				/>

				{/*Create group button*/}
				<div className='absolute bottom-1/3 left-1/2 -translate-x-1/2'>
					<button
						className='btn bg-green_1 scale-150 hover:bg-green-500'
						onClick={() => createGroupHandler()}
					>
						{
							status === 'loading' ? (
								<ClipLoader color='#E9EDEF' size={25} />
							) : (
								<ValidIcon className='fill-white mt-2 h-full' />
							)
						}
					</button>
				</div>
			</div>
		</div>
	)
}

// Default export
export default CreateGroup