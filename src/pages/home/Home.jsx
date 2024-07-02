import React from "react";
import FormEmployee from "../../components/formEmployee/FormEmployee";
import styles from "./Home.module.css";
// import Modal from "../../components/Modal";

const Home = () => {
	return (
		<main className={styles.container}>
			<div className={styles.title}>
				<h1>HRnet</h1>
			</div>
			<FormEmployee />

			{/* <Modal /> */}
		</main>
	);
};

export default Home;
