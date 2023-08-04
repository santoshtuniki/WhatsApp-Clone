// module imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// component imports
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { logout } from './features/userSlice';

function App() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	console.log('user: ', user);

	return (
		<div className='dark'>
			<button onClick={() => { dispatch(logout()) }}>Logout</button>
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/register' element={<Register />} />
					<Route path='/login' element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

// Default export
export default App;