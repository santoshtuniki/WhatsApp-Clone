// module imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

// component imports
import { Home, Login, Register } from './pages';
import SocketContext from './context/SocketContext';

// env variables
const { REACT_APP_SOCKET_ENDPOINT } = process.env;

// socket instance
const socket = io(REACT_APP_SOCKET_ENDPOINT);

function App() {
	const { user } = useSelector((state) => state.user);
	const { token } = user;

	return (
		<div className='dark'>
			<SocketContext.Provider value={socket}>
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
			</SocketContext.Provider>
		</div>
	);
}

// Default export
export default App;