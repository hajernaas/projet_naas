import React from "react";

const Table = ({ employees, sortConfig, setSortConfig, dataTestId }) => {
	const sortByField = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const renderSortIcon = (key) => {
		if (sortConfig.key !== key) return null;
		if (sortConfig.direction === "ascending") return "▲";
		return "▼";
	};

	/*const renderSortIcon = (key) => {
		if (sortConfig.key !== key) return null;
		return sortConfig.direction === "ascending" ? "▲" : "▼";
	};*/

	return (
		<table data-testid={dataTestId}>
			<thead>
				<tr>
					<th onClick={() => sortByField("firstName")} data-testid="th-firstName">
						First Name{renderSortIcon("firstName")}
					</th>
					<th onClick={() => sortByField("lastName")} data-testid="th-lastName">
						Last Name{renderSortIcon("lastName")}
					</th>
					<th onClick={() => sortByField("startDate")} data-testid="th-startDate">
						Start Date{renderSortIcon("startDate")}
					</th>
					<th onClick={() => sortByField("department")} data-testid="th-department">
						Department{renderSortIcon("department")}
					</th>
					<th onClick={() => sortByField("dateOfBirth")} data-testid="th-dateOfBirth">
						Date of Birth{renderSortIcon("dateOfBirth")}
					</th>
					<th onClick={() => sortByField("street")} data-testid="th-street">
						Street{renderSortIcon("street")}{" "}
					</th>
					<th onClick={() => sortByField("city")} data-testid="th-city">
						City{renderSortIcon("city")}
					</th>
					<th onClick={() => sortByField("state")} data-testid="th-state">
						State{renderSortIcon("state")}
					</th>
					<th onClick={() => sortByField("zipCode")} data-testid="th-zipCode">
						Zip Code{renderSortIcon("zipCode")}
					</th>
				</tr>
			</thead>
			<tbody>
				{employees.map((employee) => (
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

//<tr key={index}>
export default Table;
