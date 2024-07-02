//import React, { lazy } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import ListEmployees from "./pages/listEmployees/ListEmployees";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

//const ListEmployees = lazy(() => import("./pages/listEmployees/ListEmployees"));
//const Home = lazy(() => import("./pages/home/Home"));

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/employees" element={<ListEmployees />} />
			</Routes>
			<Footer />
		</BrowserRouter>
	);
}

export default App;
