import Logo from './../assets/Stem2.png';
import Social from './Social';
const LeftImage = () => {
	return (
		<div className="lg:flex w-1/2 hidden relative items-center">
			<div className="absolute bg-primary/30 opacity-60 inset-0 z-0"></div>
			<div className="w-full px-24 z-10 text-center text-primary">
				<div className="flex items-center justify-center w-full">
					<img className="w-32" src={Logo} alt="" />
				</div>
				<p className="text-2xl mt-4 font-semibold text-primary-light">
					Build, Launch and Scale
				</p>
				<h2 className=" text-5xl tracking-wide font-bold">Innovation</h2>
			</div>
			<div className="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4">
				<Social/>
			</div>
		</div>
	);
};

export default LeftImage;
