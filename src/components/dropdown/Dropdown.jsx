//import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";

//our offrir une sélection d'options à partir d'un menu déroulant.

/*const Dropdown = ({ id, value, options, onChange, placeholder }) => {
	console.log("valueDropdown", value);
	console.log("options", options);
	return (
		<>
			<Select
				className={styles.selectElement}
				inputId={id}
				value={options.find((option) => option.value === value)}
				options={options}
				onChange={onChange}
				placeholder={placeholder}
				isClearable
				aria-label="Dropdown"
			/>
		</>
	);
};*/
const Dropdown = ({ id, value, options, onChange }) => {
	const [selectedOption, setSelectedOption] = useState(value);

	useEffect(() => {
		setSelectedOption(value);
	}, [value]);

	const handleChange = (option) => {
		setSelectedOption(option);
		onChange(option);
	};

	return (
		<div>
			<Select
				inputId={id}
				className={styles.selectElement}
				value={selectedOption}
				onChange={handleChange}
				options={options}
				aria-label="Dropdown"
			/>
		</div>
	);
};

export default Dropdown;
