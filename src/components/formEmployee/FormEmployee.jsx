//créer un nouvel employé en remplissant un formulaire. Une fois le formulaire soumis, les données sont envoyées
// au store Redux à l'aide de useDispatch pour ajouter l'employé à la liste des employés
import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addEmployee } from "../../slices/employeesSlice";
import states from "../../data/states.json";
import departments from "../../data/departments.json";
import DateSelector from "../dateSelector/DateSelector";
import Dropdown from "../dropdown/Dropdown";
import styles from "./FormEmployee.module.css";
import { differenceInYears, format } from "date-fns";
import Modal from "../modal/Modal";
//import { useSelector } from "react-redux";
//import shortid from "shortid";
import { nanoid } from "nanoid";
//import { v4 as uuidv4 } from "uuid";

const FormEmployee = () => {
	//Options pour les départements.
	const departmentOptions = departments.map((depart) => ({
		value: depart.name,
		label: depart.label,
	}));

	//Options pour les états, générées à partir du fichier states.json.
	const stateOptions = states.map((state) => ({
		value: state.abbreviation,
		label: state.name,
	}));

	const [state, setState] = useState(stateOptions[0]);

	const [department, setDepartment] = useState(departmentOptions[0]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [newEmployee, setNewEmployee] = useState(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	//const [isSubmitting, setIsSubmitting] = useState(false);

	//const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm();

	//pour envoyer des actions au store Redux.
	const dispatch = useDispatch();
	//const employees = useSelector((state) => state.employees.employees);

	//const submittingRef = useRef(false);

	//Fonction pour gérer la soumission du formulaire.
	//Crée un nouvel objet newEmployee avec les valeurs des champs.

	const today = new Date();
	const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
	const minBirthDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate());

	const validateAge = (date) => {
		const age = differenceInYears(new Date(), new Date(date));
		return age >= 18 && age <= 65;
	};

	const filterStartDate = (date) => {
		return date <= today;
	};

	const formatDate = (date) => {
		return format(new Date(date), "dd/MM/yyyy");
	};

	/*if (isSubmitting) return;
		setIsSubmitting(true);*/

	const onSubmit = async (data) => {
		/*if (submittingRef.current) return;
		submittingRef.current = true;*/
		if (isSubmitting) return;
		setIsSubmitting(true);
		const employee = {
			...data,
			dateOfBirth: data.dateOfBirth ? formatDate(data.dateOfBirth) : null,
			startDate: data.startDate ? formatDate(data.startDate) : null,
			//id: new Date().getTime().toString(), // Ensure unique ID for each employee
			id: nanoid(),
			//id: uuidv4(),
			state: state.value,
			department: department.label,
		};
		setNewEmployee(employee);
		console.log("newEmployee", employee);
		console.log("data", data);
		console.log("state", state);
		console.log("department", department);
	};
	// Envoie l'action addEmployee avec les nouvelles données.
	//dispatch(addEmployee(newEmployee));
	/*dispatch(addEmployee(newEmployee)).then(() => {
			setIsSubmitting(false);
		});*/
	/*dispatch(addEmployee(newEmployee)).then(() => {
			submittingRef.current = false;
		});

		
		console.log("redux", dispatch(addEmployee(newEmployee)));
		reset();
		setState(stateOptions[0]);
		setDepartment(departmentOptions[0]);*/

	useEffect(() => {
		const submitEmployee = async () => {
			if (isSubmitting && newEmployee) {
				try {
					await dispatch(addEmployee(newEmployee));
				} finally {
					setIsSubmitting(false);
					setNewEmployee(null);

					// Réinitialise les champs du formulaire.
					reset();
					setState(stateOptions[0]);
					setDepartment(departmentOptions[0]);
					setIsOpenModal(true);
				}
			}
		};

		submitEmployee();
	}, [isSubmitting, newEmployee, dispatch]);

	/*useEffect(() => {
		if (isSubmitting && newEmployee) {
			dispatch(addEmployee(newEmployee));
			setIsSubmitting(false);
			setNewEmployee(null);

			// Réinitialise les champs du formulaire.
			reset();
			setState(stateOptions[0]);
			setDepartment(departmentOptions[0]);
		}
	}, [isSubmitting, newEmployee, dispatch, employees]);*/
	/*const handleChangeState = (event) => {
		setState(event.target.value);
	};
	const handleChangeDepartment = (event) => {
		setDepartment(event.target.value);
	};*/

	return (
		<>
			<h2 className={styles.title} data-testid="create-employee">
				Create Employee
			</h2>
			<div className={styles.formContainer} data-testid="form-container">
				{/* <Link to="/employees">View Current Employees</Link> */}

				<form
					onSubmit={handleSubmit(onSubmit)}
					id="form-employee"
					className={styles.form}
					data-testid="create-employee-form">
					<fieldset>
						<legend className={styles.formLegend}>
							Identity
							<div className={styles.horizontalBar}></div>
						</legend>
						<div className={styles.formGroup}>
							<div className={styles.formGroupControl}>
								<label htmlFor="first-name">First Name*</label>
								<input
									type="text"
									id="first-name"
									data-testid="first-name"
									{...register("firstName", {
										required: "First name is required",
										minLength: {
											value: 2,
											message: "First name must be at least 2 characters",
										},
									})}
								/>
								{errors.firstName && (
									<span className={styles.error} role="alert" data-testid="error-first-name">
										{errors.firstName.message}
									</span>
								)}
							</div>

							<div className={styles.formGroupControl}>
								<label htmlFor="last-name">Last Name*</label>
								<input
									type="text"
									id="last-name"
									data-testid="last-name"
									{...register("lastName", {
										required: "Last name is required",
										minLength: {
											value: 2,
											message: "Last name must be at least 2 characters",
										},
									})}
								/>
								{errors.lastName && (
									<span className={styles.error} role="alert" data-testid="error-last-name">
										{errors.lastName.message}
									</span>
								)}
							</div>
						</div>
						<div className={styles.formGroup}>
							<div className={styles.formGroupControl}>
								<label htmlFor="date-of-birth" data-testid="date-of-birth-selector">
									Date of Birth*
								</label>
								{/* <DateSelector id="date-of-birth" date={dateOfBirth} /> */}

								<Controller
									name="dateOfBirth"
									control={control}
									defaultValue={null}
									rules={{
										required: "Date of birth is required",
										validate: {
											validAge: (value) => validateAge(value),
										},
									}}
									render={({ field }) => (
										<DateSelector
											id="date-of-birth"
											date={field.value}
											onChange={field.onChange}
											minDate={minBirthDate}
											maxDate={maxBirthDate}

											//data-testid="date-of-birth-selector"

											// hasError={!!errors.dateOfBirth}
										/>
									)}
								/>
								{errors.dateOfBirth && (
									<span className={styles.error} role="alert" data-testid="error-date-of-birth">
										{errors.dateOfBirth.message}
									</span>
								)}
							</div>
							<div className={styles.formGroupControl}>
								<label htmlFor="start-date" data-testid="start-date-selector">
									Start Date*
								</label>
								{/* <DateSelector id="date-of-birth" date={startDate} /> */}
								<Controller
									name="startDate"
									control={control}
									defaultValue={null}
									rules={{
										required: "Start date is required",
									}}
									render={({ field }) => (
										<DateSelector
											id="start-date"
											date={field.value}
											onChange={field.onChange}
											maxDate={today}
											filterDate={filterStartDate}

											//data-testid="start-date-selector"
											// hasError={!!errors.dateOfBirth}
										/>
									)}
								/>
								{errors.startDate && (
									<span className={styles.error} role="alert" data-testid="error-start-date">
										{errors.startDate.message}
									</span>
								)}
							</div>
						</div>
					</fieldset>

					<fieldset>
						<legend className={styles.formLegend}>
							Address
							<div className={styles.horizontalBar}></div>
						</legend>

						<div className={styles.formGroup}>
							<div className={styles.formGroupControl}>
								<label htmlFor="street">Street*</label>
								<input
									id="street"
									data-testid="street"
									type="text"
									{...register("street", {
										required: "Street is required",
										minLength: {
											value: 5,
											message: "Street name must be at least 5 characters long",
										},
									})}
								/>
								{errors.street && (
									<span className={styles.error} role="alert" data-testid="error-street">
										{errors.street.message}
									</span>
								)}
							</div>
							<div className={styles.formGroupControl}>
								<label htmlFor="city">City*</label>
								<input
									id="city"
									type="text"
									data-testid="city"
									{...register("city", {
										required: "City name is required.",
										minLength: {
											value: 4,
											message: "City name must be at least 4 characters long.",
										},
									})}
								/>

								{errors.city && (
									<span className={styles.error} role="alert" data-testid="error-city">
										{errors.city.message}
									</span>
								)}
							</div>
						</div>

						<div className={styles.formGroup}>
							<div className={styles.dropdown}>
								<label htmlFor="state" data-testid="state">
									State
								</label>
								<Dropdown
									id="state"
									value={state}
									options={stateOptions}
									onChange={(selectedState) => setState(selectedState)}
								/>

								{/* <Controller 
									name="state"
									control={control}
									defaultValue={stateOptions[0].value}
									render={({ field }) => (
										<Dropdown
											id="state"
											value={field.value}
											options={stateOptions}
											onChange={(selectedOption) => field.onChange(selectedOption.value)}
										/>
									)}
								/>
								{errors.state && (
									<span className={styles.error} role="alert">
										{errors.state.message}
									</span>
								)}*/}
							</div>

							<div className={styles.formGroupControl}>
								<label htmlFor="zip-code">Zip Code*</label>
								<input
									id="zip-code"
									type="number"
									data-testid="zip-code"
									{...register("zipCode", {
										required: "Zip code is required",
										pattern: {
											value: /^[0-9]{5}$/,
											message: "Zip code must be a 5-digit number",
										},
									})}
								/>
								{errors.zipCode && (
									<span className={styles.error} role="alert" data-testid="error-zip-code">
										{errors.zipCode.message}
									</span>
								)}
							</div>
						</div>
					</fieldset>

					<div className={styles.dropdownDept}>
						<label htmlFor="department" className={styles.dept}>
							Department
						</label>
						<Dropdown
							id="department"
							value={department}
							options={departmentOptions}
							onChange={(selectedOption) => setDepartment(selectedOption)}
						/>

						{/* <Controller
							name="department"
							control={control}
							defaultValue={departmentOptions[0].value}
							render={({ field }) => (
								<Dropdown
									id="department"
									value={field.value}
									options={departmentOptions}
									onChange={(selectedOption) => field.onChange(selectedOption.value)}
								/>
							)}
						/>
						{errors.department && (
							<span className={styles.error} role="alert">
								{errors.department.message}
							</span>
						)} */}
					</div>

					<button
						aria-label="Submit form"
						className={styles.submitBtn}
						type="submit"
						data-testid="btn-submit-form">
						Save
					</button>
				</form>
			</div>
			<div data-testid="form-modal-container">
				{isOpenModal && <Modal onClose={() => setIsOpenModal(false)} />}
			</div>
		</>
	);
};

export default FormEmployee;
