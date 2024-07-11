// Importez les dépendances nécessaires pour le test
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "../App";
import { store, persistor } from "../store/store";

// Test unitaire pour le composant App avec Redux et Redux Persist
test("renders App component with Redux and Redux Persist", () => {
	render(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	);

	// Vous pouvez ajouter ici des assertions pour vérifier le contenu rendu
	// Par exemple, vérifiez qu'un élément spécifique est présent dans votre composant rendu
	expect(screen.getByText("Create Employee")).toBeInTheDocument();
});
