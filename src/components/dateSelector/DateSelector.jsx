import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import styles from "./DateSelector.module.css";
import styles from "./DateSelector.module.css";

//pour offrir une sélection de dates personnalisée avec plusieurs fonctionnalités.

const DateSelector = ({ id, date, onChange, minDate, maxDate, filterDate }) => {
	return (
		<DatePicker
			id={id}
			className={styles.datePicker}
			selected={date}
			onChange={onChange}
			minDate={minDate}
			maxDate={maxDate}
			filterDate={filterDate}
			dateFormat="dd/MM/yyyy"
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled,
			}) => (
				<div
					style={{
						margin: 10,
						display: "flex",
						justifyContent: "center",
					}}>
					<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
						{"<"}
					</button>
					<select
						value={date.getFullYear()}
						onChange={({ target: { value } }) => changeYear(value)}>
						{Array.from(new Array(100), (v, i) => (
							<option key={i} value={1950 + i}>
								{1950 + i}
							</option>
						))}
					</select>

					<select value={date.getMonth()} onChange={({ target: { value } }) => changeMonth(value)}>
						{[
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December",
						].map((month, index) => (
							<option key={index} value={index}>
								{month}
							</option>
						))}
					</select>
					<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
						{">"}
					</button>
				</div>
			)}
		/>
	);
};

export default DateSelector;

//className={`${styles.datePicker} ${hasError ? styles.datePickerError : ""}`}
