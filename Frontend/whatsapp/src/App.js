// module imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// component imports
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	return (
		<div className='dark'>
			<Router>
				<Routes>
					<Route
						exact
						path='/'
						element={token ? <Home /> : <Navigate to='/login' />}
					/>
					<Route
						exact
						path='/login'
						element={!token ? <Login /> : <Navigate to='/' />}
					/>
					<Route
						exact
						path='/register'
						element={!token ? <Register /> : <Navigate to='/' />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

// Default export
export default App;