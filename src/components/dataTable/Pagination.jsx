/*import React from "react";
import "./Pagination.css";

const Pagination = ({ employeesPerPage, totalEmployees, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav>
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number} className="page-item">
						<button onClick={() => paginate(number)} className="page-link">
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Pagination;
*/

import React from "react";
import "./Pagination.css";

/*const Pagination = ({ employeesPerPage, totalEmployees, paginate, currentPage }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
		pageNumbers.push(i);
	}

	const indexOfLastEmployee = currentPage * employeesPerPage;
	const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

	return (
		<div className="pagination-container">
			<div className="pagination-info">
				{`Showing ${indexOfFirstEmployee + 1} to ${Math.min(
					indexOfLastEmployee,
					totalEmployees
				)} of ${totalEmployees} entries`}
			</div>
			<ul className="pagination">
				<li>
					<button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
						Précédent
					</button>
				</li>
				{pageNumbers.map((number) => (
					<li key={number} className={currentPage === number ? "active" : ""}>
						<button onClick={() => paginate(number)}>{number}</button>
					</li>
				))}
				<li>
					<button
						onClick={() => paginate(currentPage + 1)}
						disabled={currentPage === pageNumbers.length}>
						Suivant
					</button>
				</li>
			</ul>
		</div>
	);
};*/

const Pagination = ({ employeesPerPage, totalEmployees, paginate, currentPage }) => {
	const pageNumbers = [];
	const totalPages = Math.ceil(totalEmployees / employeesPerPage);
	const maxPageNumbersToShow = 5;

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	const indexOfLastEmployee = currentPage * employeesPerPage;
	const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

	const getPaginationRange = () => {
		const totalNumbers = maxPageNumbersToShow + 2;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, currentPage - Math.floor(maxPageNumbersToShow / 2));
			const endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageNumbersToShow / 2));

			let pages = [1];

			if (startPage > 2) {
				pages.push("...");
			}

			for (let i = startPage; i <= endPage; i++) {
				pages.push(i);
			}

			if (endPage < totalPages - 1) {
				pages.push("...");
			}

			pages.push(totalPages);

			return pages;
		}

		return pageNumbers;
	};

	const paginationRange = getPaginationRange();

	return (
		<div className="pagination-container" data-testid="pagination-container">
			<div className="pagination-info" data-testid="pagination-info">
				{`Showing ${indexOfFirstEmployee + 1} to ${Math.min(
					indexOfLastEmployee,
					totalEmployees
				)} of ${totalEmployees} entries`}
			</div>
			<ul className="pagination" data-testid="pagination-list">
				<li>
					<button
						onClick={() => paginate(currentPage - 1)}
						disabled={currentPage === 1}
						data-testid="pagination-previous">
						Précédent
					</button>
				</li>
				{paginationRange.map((number, index) => (
					<li key={index} className={currentPage === number ? "active" : ""}>
						{number === "..." ? (
							<span className="ellipsis">...</span>
						) : (
							<button onClick={() => paginate(number)} data-testid={`pagination-page-${number}`}>
								{number}
							</button>
						)}
					</li>
				))}
				<li>
					<button
						onClick={() => paginate(currentPage + 1)}
						disabled={currentPage === totalPages}
						data-testid="pagination-next">
						Suivant
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
