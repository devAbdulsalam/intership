/* eslint-disable react/prop-types */
import { stateOptions, states } from './data.js';
import { useState } from 'react';

const SelectStateAndLGA = ({
	// selectedState,
	setSelectedState,
	// selectedLga,
	setSelectedLga,
	register,
	errors,
}) => {
	const [lgaList, setLgaList] = useState([]);
	const getLGAs = (selectedState) => {
		let result = states.filter((item) => {
			if (item.state === selectedState) {
				return item;
			}
		});

		return result[0].lgas;
	};
	const handleSelectOptionChange = (e) => {
		setSelectedLga('');
		let lgas = getLGAs(e.target.value);
		setSelectedState(e.target.value);
		setLgaList(lgas);
	};
	const handleLgaChange = (e) => {
		// console.log(e.target.value);
		setSelectedLga(e.target.value);
		// console.log(selectedLga);
	};
	return (
		<div className="md:flex gap-2 w-full">
			<div className="w-full">
				<label htmlFor="state" className="text-gray-800 font-semibold">
					State of Origin
				</label>
				<select
					name="state"
					id="state"
					// value={selectedState}
					{...register('state', {
						required: 'Please select your state of origin',
					})}
					onChange={handleSelectOptionChange}
					className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
				>
					<option value="">--Select State--</option>
					{stateOptions.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
				{errors.state && (
					<div className="text-red-500">{errors.state.message}</div>
				)}
			</div>
			<div className="w-full">
				<label htmlFor="lga-select" className="text-gray-800 font-semibold">
					Select an LGA:
				</label>
				<select
					id="lga-select"
					name="lga"
					// value={selectedLga}
					onChange={handleLgaChange}
					{...register('lga', {
						required: 'Please select your lga',
					})}
					className="w-full px-3 my-2 py-2 text-lg inline-block font-normal text-gray-500 bg-clip-padding border-2 border-primary-light rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary focus:outline-none"
				>
					<option value="">--Select LGA--</option>
					{lgaList.map((lga) => (
						<option key={lga} value={lga}>
							{lga}
						</option>
					))}
				</select>
				{errors.lga && <div className="text-red-500">{errors.lga.message}</div>}
			</div>
		</div>
	);
};

export default SelectStateAndLGA;
