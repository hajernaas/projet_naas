import React, { useState } from "react";
import { useSelector } from "react-redux";
import { parse } from "date-fns";
//import { selectEmployees } from "../../slices/employeesSlice";
import Table from "./Table";
import Pagination from "./Pagination";
import "./EmployeeTable.css";

const EmployeeTable = () => {
	const employees = useSelector((state) => state.employees.employees);
	//const employees = useSelector(selectEmployees);
	//const employees = useSelector((state) => state.employees);

	//console.log("employeesTable", employees);

	const [currentPage, setCurrentPage] = useState(1);
	const [employeesPerPage, setEmployeesPerPage] = useState(10);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortConfig, setSortConfig] = useState({ key: "firstName", direction: "ascending" });

	/*	if (!Array.isArray(employees)) {
		console.error("employees is not an array:", employees);
		return null; // ou gérez l'erreur comme vous le souhaitez
	}*/

	const sortedEmployees = React.useMemo(() => {
		let sortableEmployees = [...employees];

		if (sortConfig !== null) {
			sortableEmployees.sort((a, b) => {
				let aValue = a[sortConfig.key];
				let bValue = b[sortConfig.key];

				// Format de date attendu
				const dateFormat = "dd/MM/yyyy";

				// Vérification si la valeur est une date dans le format spécifique
				const isDate = (date) => {
					try {
						const parsedDate = parse(date, dateFormat, new Date());
						return !isNaN(parsedDate);
					} catch {
						return false;
					}
				};

				if (isDate(aValue) && isDate(bValue)) {
					aValue = parse(aValue, dateFormat, new Date());
					bValue = parse(bValue, dateFormat, new Date());
				} else {
					aValue = aValue.toString().toLowerCase();
					bValue = bValue.toString().toLowerCase();
				}

				if (aValue < bValue) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
				/*	let aValue = a[sortConfig.key];
				let bValue = b[sortConfig.key];

				const isDate = (date) => !isNaN(Date.parse(date));

				if (isDate(aValue) && isDate(bValue)) {
					aValue = new Date(aValue);
					bValue = new Date(bValue);
				} else {
					aValue = aValue.toString().toLowerCase();
					bValue = bValue.toString().toLowerCase();
				}

				if (aValue < bValue) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;*/
				/*if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;*/
				/*	const aValue = a[sortConfig.key].toString().toLowerCase();
				const bValue = b[sortConfig.key].toString().toLowerCase();

				if (aValue < bValue) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;*/
			});
		}

		return sortableEmployees;
	}, [employees, sortConfig]);

	/*	const filteredEmployees = sortedEmployees.filter((employee) =>
		Object.values(employee).some((value) => value.toLowerCase().includes(searchTerm.toLowerCase()))
	);
*/

	function normalizeValue(value) {
		return (
			value
				.toLowerCase()
				.replace(/\s/g, "")
				// Enlever les accents
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
		);
	}

	const filteredEmployees = sortedEmployees.filter((employee) =>
		Object.values(employee).some(
			(value) =>
				typeof value === "string" && normalizeValue(value).includes(normalizeValue(searchTerm))
		)
	);

	/*const filteredEmployees = sortedEmployees.filter((employee) =>
		Object.values(employee).some(
			(value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);*/

	/*const employeesPerPage = 10; // Nombre d'employés par page
	const currentPage = 2; // Numéro de la page actuelle (exemple)

	const indexOfFirstEmployee = (currentPage - 1) * employeesPerPage;
	const indexOfLastEmployee = currentPage * employeesPerPage;*/

	const indexOfLastEmployee = currentPage * employeesPerPage;
	const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
	const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
	console.log("currentEmployees", currentEmployees);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	const handleEmployeesPerPageChange = (event) => {
		setEmployeesPerPage(Number(event.target.value));
	};

	return (
		<>
			{/* <select 
				onChange={(e) => setEmployeesPerPage(Number(e.target.value))}
				value={employeesPerPage}>*/}
			<div className="containerSearchSelect">
				<select
					className="select"
					value={employeesPerPage}
					onChange={handleEmployeesPerPageChange}
					data-testid="select-employees-per-page">
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
					<option value={100}>100</option>
				</select>
				<input
					className="search"
					type="text"
					placeholder="Search"
					value={searchTerm}
					data-testid="search-input"
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</div>

			<Table
				employees={currentEmployees}
				sortConfig={sortConfig}
				setSortConfig={setSortConfig}
				//data-testid="employees-table"
				dataTestId="employees-table"
			/>

			<Pagination
				employeesPerPage={employeesPerPage}
				totalEmployees={filteredEmployees.length}
				paginate={paginate}
				currentPage={currentPage}
				dataTestId="pagination"
				//data-testid="pagination"
			/>
		</>
	);
};

export default EmployeeTable;
