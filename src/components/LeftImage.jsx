import Social from './Social';
import { motion } from 'framer-motion';
const LeftImage = () => {
	return (
		<div className="lg:flex w-1/2 hidden relative items-center bgImage bg-cover bg-no-repeat">
			<div className="absolute bg-primary/50 opacity-60 inset-0 z-0"></div>
			<div className="w-full px-24 z-10 text-center text-white">
				<motion.div
					initial={{ x: 50 }}
					animate={{ x: 0 }}
					transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}
				>
					<h2 className="mt-2 text-4xl tracking-wide font-bold">
						Build, Launch and Scale
					</h2>
				</motion.div>
				<motion.div
					initial={{ x: -50 }}
					animate={{ x: 0 }}
					transition={{ ease: 'easeOut', duration: 1, delay: 0.5 }}
				>
					<h2 className="mt-4 text-4xl tracking-wide font-semibold">
						Innovations
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
