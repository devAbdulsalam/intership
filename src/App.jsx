import { Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Layout from './Layout';
import Interns from './pages/Interns';

export default function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route exact path="/" element={<Interns />} />
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
