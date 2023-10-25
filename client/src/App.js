import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Candidate from './components/Candidate';
import Company from './components/Company';

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path='/candidate' element={<Candidate />} />
				<Route exact path='/company' element={<Company />} />
			</Routes>
		</Router>
	);
}

export default App;
