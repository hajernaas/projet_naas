/*import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import FormEmployee from "../components/formEmployee/FormEmployee";
describe("FormEmployee component", () => {
	it("renders without crashing", () => {
		render(<FormEmployee />);
	});

	it("validates first name field", async () => {
		const { getByLabelText, getByTestId, findByRole } = render(<FormEmployee />);
		const firstNameInput = getByLabelText("First Name*");

		fireEvent.change(firstNameInput, { target: { value: "A" } });
		fireEvent.submit(getByTestId("create-employee-form"));

		const errorMessage = await findByRole("alert");
		expect(errorMessage).toHaveTextContent("First name must be at least 2 characters");
	});

	it("validates date of birth field", async () => {
		const { getByLabelText, getByTestId, findByRole } = render(<FormEmployee />);
		const dateOfBirthInput = getByLabelText("Date of Birth*");

		fireEvent.change(dateOfBirthInput, { target: { value: "2023-01-01" } });
		fireEvent.submit(getByTestId("create-employee-form"));

		const errorMessage = await findByRole("alert");
		expect(errorMessage).toHaveTextContent("Age must be between 18 and 65");
	});

	// Add other similar tests for each field and functionality.

	it("submits form with correct data", async () => {
		const { getByLabelText, getByTestId } = render(<FormEmployee />);
		const firstNameInput = getByLabelText("First Name*");
		const lastNameInput = getByLabelText("Last Name*");
		const dateOfBirthInput = getByLabelText("Date of Birth*");

		fireEvent.change(firstNameInput, { target: { value: "John" } });
		fireEvent.change(lastNameInput, { target: { value: "Doe" } });
		fireEvent.change(dateOfBirthInput, { target: { value: "1990-01-01" } });

		fireEvent.submit(getByTestId("create-employee-form"));

		// Wait for modal to open or check for expected outcome.
		await waitFor(() => {
			expect(getByTestId("form-modal-container")).toBeInTheDocument();
		});
	});
});*/

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import FormEmployee from "../components/formEmployee/FormEmployee";
//import { employeesSlice} from "../slices/employeesSlice";
import employeesReducer from "../slices/employeesSlice";
import "@testing-library/jest-dom"; // Pour des assertions supplémentaires

// Création d'un store Redux avec configureStore
const store = configureStore({
	reducer: {
		employees: employeesReducer,
	},
});

const initialEmployeesCount = store.getState().employees.employees.length;
console.log("initialEmployeesCount", initialEmployeesCount);

describe("FormEmployee component", () => {
	test("renders FormEmployee component with redux and react-hook-form", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Vérifier que le titre du formulaire est présent
		expect(screen.getByTestId("create-employee")).toBeInTheDocument();

		// Simuler la saisie des champs du formulaire avec userEvent
		await userEvent.type(screen.getByTestId("first-name"), "John");
		await userEvent.type(screen.getByTestId("last-name"), "Doe");
		await userEvent.type(screen.getByTestId("date-of-birth-selector"), "2000-01-01");
		await userEvent.type(screen.getByTestId("start-date-selector"), "2020-01-01");
		await userEvent.type(screen.getByTestId("street"), "123 Main St");
		await userEvent.type(screen.getByTestId("city"), "Anytown");
		//await userEvent.selectOptions(screen.getByTestId("state"), "California");
		await userEvent.type(screen.getByTestId("zip-code"), "12345");
		//await userEvent.selectOptions(screen.getByTestId("department"), "Engineering");

		/*
		const stateDropdown = screen.getByTestId("state");
		await userEvent.click(stateDropdown);
		const stateOption = await screen.findByText("CA");
		await userEvent.click(stateOption);

	
		const departmentDropdown = screen.getByTestId("department");
		await userEvent.click(departmentDropdown);
		const departmentOption = await screen.findByText("Engineering");
		await userEvent.click(departmentOption);
*/
		userEvent.click(screen.getByLabelText(/state/i));
		await waitFor(() => userEvent.click(screen.getByText("New York")));

		userEvent.click(screen.getByLabelText(/department/i));
		await waitFor(() => userEvent.click(screen.getByText("Engineering")));

		// Soumettre le formulaire
		await userEvent.click(screen.getByTestId("btn-submit-form"));

		await waitFor(() => {
			const updatedEmployeesCount = store.getState().employees.employees.length;
			expect(updatedEmployeesCount).toBe(initialEmployeesCount + 1); // Mettez à jour avec le nombre attendu d'employés après l'ajout
		});

		// Vérifier que le modal est ouvert après la soumission du formulaire
		expect(screen.getByTestId("form-modal-container")).toBeInTheDocument();
	});

	test("displays validation errors when required fields are empty", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Soumettre le formulaire sans rien saisir dans les champs requis
		await userEvent.click(screen.getByTestId("btn-submit-form"));

		// Vérifier les messages d'erreur pour les champs requis
		expect(await screen.findByText("First name is required")).toBeInTheDocument();
		expect(await screen.findByText("Last name is required")).toBeInTheDocument();
		expect(await screen.findByText("Date of birth is required")).toBeInTheDocument();
		expect(await screen.findByText("Start date is required")).toBeInTheDocument();
		expect(await screen.findByText("Street is required")).toBeInTheDocument();
		expect(await screen.findByText("City name is required.")).toBeInTheDocument();
		expect(await screen.findByText("Zip code is required")).toBeInTheDocument();
	});

	test("displays validation errors when input values are invalid", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Saisir des valeurs invalides dans certains champs
		await userEvent.type(screen.getByTestId("first-name"), "J");
		await userEvent.type(screen.getByTestId("last-name"), "D");
		await userEvent.type(screen.getByTestId("date-of-birth-selector"), "2002-01-01");
		await userEvent.type(screen.getByTestId("start-date-selector"), "2024-11-11");
		await userEvent.type(screen.getByTestId("street"), "123");
		await userEvent.type(screen.getByTestId("city"), "An");
		await userEvent.type(screen.getByTestId("zip-code"), "1234");

		await userEvent.click(screen.getByTestId("btn-submit-form"));

		// Vérifier les messages d'erreur pour les valeurs invalides
		expect(await screen.findByText("First name must be at least 2 characters")).toBeInTheDocument();
		expect(await screen.findByText("Last name must be at least 2 characters")).toBeInTheDocument();
		//expect(await screen.findByText("Age must be between 18 and 65")).toBeInTheDocument();
		expect(
			await screen.findByText("Street name must be at least 5 characters long")
		).toBeInTheDocument();
		expect(
			await screen.findByText("City name must be at least 4 characters long.")
		).toBeInTheDocument();
		expect(await screen.findByText("Zip code must be a 5-digit number")).toBeInTheDocument();
	});
});

// Création d'un store Redux avec configureStore
/*const store = configureStore({
	reducer: {
		employees: {
			list: [],
		},
	},
});

const store = configureStore({ reducer: { employeeData: employeesSlice } });

describe("FormEmployee component", () => {
	test("renders FormEmployee component with redux and react-hook-form", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Vérifier que le titre du formulaire est présent
		expect(screen.getByTestId("create-employee")).toBeInTheDocument();

		// Simuler la saisie des champs du formulaire avec userEvent
		userEvent.type(screen.getByTestId("first-name"), "John");
		userEvent.type(screen.getByTestId("last-name"), "Doe");
		userEvent.type(screen.getByTestId("date-of-birth-selector"), "2000-01-01");
		userEvent.type(screen.getByTestId("start-date-selector"), "01/07/2024");
		userEvent.type(screen.getByTestId("street"), "123 Main St");
		userEvent.type(screen.getByTestId("city"), "Anytown");
		userEvent.selectOptions(screen.getByTestId("state"), "CA");
		userEvent.type(screen.getByTestId("zip-code"), "12345");
		userEvent.selectOptions(screen.getByTestId("department"), "IT");

		// Soumettre le formulaire
		userEvent.click(screen.getByTestId("btn-submit-form"));

		// Attendre que l'action Redux soit dispatchée
		await waitFor(() => {
			const actions = store.getActions();
			expect(actions.some((action) => action.type === employeesSlice.type)).toBe(true);
		});

		// Vérifier que le modal est ouvert après la soumission du formulaire
		expect(screen.getByTestId("form-modal-container")).toBeInTheDocument();
	});

	test("displays validation errors when required fields are empty", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Soumettre le formulaire sans rien saisir dans les champs requis
		userEvent.click(screen.getByTestId("btn-submit-form"));

		// Vérifier les messages d'erreur pour les champs requis
		expect(await screen.findByText("First name is required")).toBeInTheDocument();
		expect(await screen.findByText("Last name is required")).toBeInTheDocument();
		expect(await screen.findByText("Date of birth is required")).toBeInTheDocument();
		expect(await screen.findByText("Start date is required")).toBeInTheDocument();
		expect(await screen.findByText("Street is required")).toBeInTheDocument();
		expect(await screen.findByText("City name is required.")).toBeInTheDocument();
		expect(await screen.findByText("Zip code is required")).toBeInTheDocument();
	});

	test("displays validation errors when input values are invalid", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Saisir des valeurs invalides dans certains champs
		userEvent.type(screen.getByTestId("first-name"), "J");
		userEvent.type(screen.getByTestId("last-name"), "D");
		userEvent.type(screen.getByTestId("date-of-birth-selector"), "2000-01-01");
		userEvent.type(screen.getByTestId("start-date-selector"), "01/01/2024");
		userEvent.type(screen.getByTestId("street"), "123");
		userEvent.type(screen.getByTestId("city"), "An");
		userEvent.type(screen.getByTestId("zip-code"), "1234");
		userEvent.click(screen.getByTestId("btn-submit-form"));

		// Vérifier les messages d'erreur pour les valeurs invalides
		expect(await screen.findByText("First name must be at least 2 characters")).toBeInTheDocument();
		expect(await screen.findByText("Last name must be at least 2 characters")).toBeInTheDocument();
		expect(await screen.findByText("Age must be between 18 and 65")).toBeInTheDocument(); // Exemple de validation personnalisée
		expect(
			await screen.findByText("Street name must be at least 5 characters long")
		).toBeInTheDocument();
		expect(
			await screen.findByText("City name must be at least 4 characters long.")
		).toBeInTheDocument();
		expect(await screen.findByText("Zip code must be a 5-digit number")).toBeInTheDocument();
	});
});
*/
