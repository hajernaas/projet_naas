import { createSlice } from "@reduxjs/toolkit";
//import listEmployees from "../data/listEmployees.json";
//import list from "../data/list.json";
import listeEmployes from "../data/listeEmployes.json";

/*const initialState = {
	employees: listEmployees, 
	employees: [],
};
*/
/*const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		addEmployee(state, action) {
			console.log("yyyyyyyyyyyyyy");
			const employeeExists = state.employees.find((employee) => employee.id === action.payload.id);
			if (!employeeExists) {
			state.employees.push(action.payload);
			}

			
		},

	},
});
*/

export const employeesSlice = createSlice({
	name: "employees",
	initialState: { employees: listeEmployes },
	reducers: {
		addEmployee: (state, action) => {
			state.employees.push(action.payload);
		},
	},
});
// Export de l'action générée automatiquement par le slice
export const { addEmployee } = employeesSlice.actions;
//export const selectEmployees = (state) => state.employees.employees;

// Export du réducteur du slice
export default employeesSlice.reducer;
