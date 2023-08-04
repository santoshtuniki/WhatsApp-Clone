// module imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// component imports
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
	return (
		<div className='dark'>
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