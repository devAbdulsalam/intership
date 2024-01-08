import Logo from './../assets/Stem2.png';
import Social from './Social';
import { motion } from 'framer-motion';
const LeftImage = () => {
	return (
		<div className="lg:flex w-1/2 hidden relative items-center bgImage bg-cover">
			<div className="absolute bg-primary/80 opacity-60 inset-0 z-0"></div>
			<div className="w-full px-24 z-10 text-center text-white opacity-50">
				<motion.div
					initial={{ opacity: 0, scale: 0.5 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.8, delay: 0.5 }}
				>
					<div className="flex items-center justify-center w-full">
						<img className="w-32" src={Logo} alt="" />
					</div>
				</motion.div>
				<motion.div
					initial={{ x: 50 }}
					animate={{ x: 0 }}
					transition={{ ease: 'easeOut', duration: 2, delay: 0.7 }}
				>
					<h2 className="mt-2 text-2xl tracking-wide font-bold">
						Build, Launch and Scale Innovations
					</h2>
				</motion.div>
			</div>
			<div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
				<Social />
			</div>
		</div>
	);
};

export default LeftImage;
