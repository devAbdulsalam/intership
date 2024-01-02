// import { useEffect } from 'react';
import stemImage from '../assets/stem2.png';
import { Link } from 'react-router-dom';
const Home = () => {
	// const navigate = useNavigate();
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		navigate('/register');
	// 	}, 1000);
	// }, [navigate]);
	return (
		<div
			className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
			style={{
				backgroundImage: stemImage,
			}}
		>
			<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
			<h2>WelCome</h2>
			<Link to="/register">Register</Link>
		</div>
	);
};

export default Home;
