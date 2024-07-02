import React, { useState } from "react";
import { useSelector } from "react-redux";
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
	const [sortConfig, setSortConfig] = useState({ key: "firstName", direction: "ascending" });
	const [searchTerm, setSearchTerm] = useState("");

	/*	if (!Array.isArray(employees)) {
		console.error("employees is not an array:", employees);
		return null; // ou gérez l'erreur comme vous le souhaitez
	}*/

	const sortedEmployees = React.useMemo(() => {
		let sortableEmployees = [...employees];

		if (sortConfig !== null) {
			sortableEmployees.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
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
			<input
				type="text"
				placeholder="Search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			{/* <select 
				onChange={(e) => setEmployeesPerPage(Number(e.target.value))}
				value={employeesPerPage}>*/}
			<select value={employeesPerPage} onChange={handleEmployeesPerPageChange}>
				<option value={10}>10</option>
				<option value={25}>25</option>
				<option value={50}>50</option>
				<option value={100}>100</option>
			</select>
			<Table employees={currentEmployees} sortConfig={sortConfig} setSortConfig={setSortConfig} />
			<Pagination
				employeesPerPage={employeesPerPage}
				totalEmployees={filteredEmployees.length}
				paginate={paginate}
				currentPage={currentPage}
			/>
		</>
	);
};

export default EmployeeTable;
