import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import stemImage from '../assets/stem.png';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import Loading from '../components/Loading';
import SelectStateAndLGA from '../components/SelectStateAndLGA';
import { useState } from 'react';
import AddImage from '../components/AddImage';
import { programs } from './data';

const Interns = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [imageFile, setImageFile] = useState(null);
	const [selectedState, setSelectedState] = useState('');
	const [selectedLga, setSelectedLga] = useState('');
	const [selectedProgram, setSelectedProgram] = useState('');
	const [programInfo, setProgramInfo] = useState('');
	const phoneRegExp = /^(?:\d{11})$/;
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm();
	const config = {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	};
	const submitHandler = async (formValues) => {
		if (!imageFile) {
			return toast.error('Image is required');
		}
		const formData = new FormData();
		for (const key in formValues) {
			formData.append(key, formValues[key]);
		}
		formData.append('image', imageFile);
		setLoading(true);
		axios
			.post('/api/user/login', formData, config)
			.then(() => {
				toast.success('Registration sucessfull');
				setTimeout(() => {
					navigate('/');
				}, 200);
			})
			.catch((error) => {
				toast.error(error.message || 'Something went wrong!');
			})
			.finally(() => setLoading(false));
	};
	const showProgramInfo = (event) => {
		const selectedProgramName = event.target.value;
		setSelectedProgram(selectedProgramName);

		// Find the selected program in the programs array
		const selectedProgramData = programs.find(
			(program) => program.name === selectedProgramName
		);

		if (selectedProgramData) {
			// Display information for the selected program
			setProgramInfo(selectedProgramData.courses);
		} else {
			setProgramInfo([]);
		}
	};
	return (
		<>
			<div className="flex justify-center items-center w-full  bg-slate-50 overflow-y-auto">
				<div className="px-2 py-4 z-10 shadow h-full w-[768px] mx-auto">
					<div className="my-2">
						<Link to="/" className="">
							<HiArrowNarrowLeft className="h-6 w-6 text-primary" />
						</Link>
					</div>
					<div className="mx-auto">
						<img
							className="mx-auto my-10 md:my-4"
							src={stemImage}
							alt="stemLab"
						/>
						<h2 className="text-center text-2xl md:text-xl font-semibold mb-6 text-primary">
							Internship Registeration Form
						</h2>
						<AddImage setImageFile={setImageFile} />
						<form
							className="mx-auto px-5 bg-white py-8 rounded-md mb-6"
							onSubmit={handleSubmit(submitHandler)}
						>
							<div className="mb-3">
								<label htmlFor="name" className="text-gray-800 font-semibold">
									{' '}
									Full name
									<span className="text-red-500"> *</span>
								</label>
								<input
									type="text"
									className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
									placeholder="Enter your name Address"
									id="name"
									{...register('name', {
										required: 'Please enter your name',
									})}
								/>
								{errors.name && (
									<div className="text-red-500">{errors.name.message}</div>
								)}
							</div>
							<div className="">
								<label htmlFor="phone" className="text-gray-800 font-semibold">
									Phone number
									<span className="text-red-500"> *</span>
								</label>
								<input
									type="phone"
									className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
									placeholder="Enter your phone"
									id="phone"
									{...register('phone', {
										required: 'Phone number is required',
										pattern: {
											value: phoneRegExp,
											message: 'Enter a valid 11-digit phone number',
										},
									})}
								/>
								{errors.phone && (
									<div className="text-red-500">{errors.phone.message}</div>
								)}
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="text-gray-800 font-semibold">
									{' '}
									Email
									<span className="text-red-500"> *</span>
								</label>
								<input
									type="email"
									className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
									placeholder="Enter your Email Address"
									id="email"
									{...register('email', {
										required: 'Please enter email',
										pattern: {
											value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
											message: 'Please enter valid email',
										},
									})}
								/>
								{errors.email && (
									<div className="text-red-500">{errors.email.message}</div>
								)}
							</div>
							<div className="md:flex gap-2 w-full">
								<div className="w-full">
									<label htmlFor="dob" className="text-gray-800 font-semibold">
										Date of Birth
									</label>
									<input
										type="date"
										className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
										id="dob"
										{...register('dob', {
											required: 'Please enter your date of birth',
										})}
									/>
									{errors.dob && (
										<div className="text-red-500">{errors.dob.message}</div>
									)}
								</div>
								<div className="w-full">
									<label
										htmlFor="gender"
										className="text-gray-800 font-semibold"
									>
										Gender
									</label>
									<select
										className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
										id="gender"
										{...register('gender', {
											required: 'Please enter your gender',
										})}
									>
										<option value="">Select Gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</select>
									{errors.gender && (
										<div className="text-red-500">{errors.gender.message}</div>
									)}
								</div>
							</div>
							<div className="">
								<label
									htmlFor="institution"
									className="text-gray-800 font-semibold"
								>
									Institution attended
								</label>
								<input
									type="institution"
									className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
									placeholder="Enter your institution"
									id="institution"
									{...register('institution')}
								/>
							</div>
							<div className="">
								<label htmlFor="course" className="text-gray-800 font-semibold">
									Course of Study
								</label>
								<input
									type="course"
									className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
									placeholder="Enter your course of study"
									id="course"
									{...register('course')}
								/>
							</div>

							<div className="">
								<SelectStateAndLGA
									selectedState={selectedState}
									setSelectedState={setSelectedState}
									selectedLga={selectedLga}
									setSelectedLga={setSelectedLga}
									register={register}
									errors={errors}
								/>
							</div>
							<div className="mt-2">
								<label
									htmlFor="programe"
									className="text-gray-800 font-semibold"
								>
									Select Programe
								</label>
								<select
									{...register('programe', {
										required: 'Please select a programe',
									})}
									onChange={showProgramInfo}
									className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-600 focus:outline-none"
								>
									<option value="">Select Program</option>
									{programs.map((program) => (
										<option key={program.name} value={program.name}>
											{program.name}
										</option>
									))}
								</select>
								{errors.programe && (
									<div className="text-red-500">{errors.programe.message}</div>
								)}
								<div className="mt-2 mb-3 show-program-info shadow p-3">
									{selectedProgram && (
										<>
											<h2 className="text-gray-800 font-semibold text-lg">{`${selectedProgram} Program Info:`}</h2>
											<ul className="list-disc  ml-6">
												{programInfo.map((program, index) => (
													<li key={index} className="mt-2 text-md">
														{program}
													</li>
												))}
											</ul>
										</>
									)}
								</div>
							</div>
							<div className="space-y-4 mt-2">
								<button
									className="rounded w-full mx-auto bg-primary py-2 px-4 text-xl font-semibold text-white shadow outline-none hover:bg-primary-light  active:bg-primary"
									disabled={loading}
									type="submit"
								>
									{loading ? 'Loading' : 'Submit'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			{loading && <Loading />}
		</>
	);
};

export default Interns;
