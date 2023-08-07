// module imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

// component imports
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
	const { user } = useSelector((state) => state.user);
	console.log('user: ', user);

	return (
		<div className='dark'>
			<Router>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/login' element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
}

// Default export
export default App;