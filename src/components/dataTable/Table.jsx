import React from "react";
//import { format } from "date-fns";

const Table = ({ employees, sortConfig, setSortConfig }) => {
	const requestSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const renderSortIcon = (key) => {
		if (sortConfig.key !== key) return null;
		if (sortConfig.direction === "ascending") return " ▲";
		return " ▼";
	};

	return (
		<table>
			<thead>
				<tr>
					<th onClick={() => requestSort("firstName")}>First Name{renderSortIcon("firstName")}</th>
					<th onClick={() => requestSort("lastName")}>Last Name{renderSortIcon("lastName")}</th>
					<th onClick={() => requestSort("startDate")}>Start Date{renderSortIcon("startDate")}</th>
					<th onClick={() => requestSort("department")}>
						Department{renderSortIcon("department")}
					</th>
					<th onClick={() => requestSort("dateOfBirth")}>
						Date of Birth{renderSortIcon("dateOfBirth")}
					</th>
					<th onClick={() => requestSort("street")}>Street{renderSortIcon("street")}</th>
					<th onClick={() => requestSort("city")}>City{renderSortIcon("city")}</th>
					<th onClick={() => requestSort("state")}>State{renderSortIcon("state")}</th>
					<th onClick={() => requestSort("zipCode")}>Zip Code{renderSortIcon("zipCode")}</th>
				</tr>
			</thead>
			<tbody>
				{employees.map((employee) => (
					//<tr key={index}>
					<tr key={employee.id}>
						<td>{employee.firstName}</td>
						<td>{employee.lastName}</td>
						<td>{employee.startDate}</td>
						<td>{employee.department}</td>
						<td>{employee.dateOfBirth}</td>
						<td>{employee.street}</td>
						<td>{employee.city}</td>
						<td>{employee.state}</td>
						<td>{employee.zipCode}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
