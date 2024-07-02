import React from "react";
import styles from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHouse, faUsers } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.webp";

const Header = () => {
	// État pour gérer l'état du menu déroulant
	const [toggle, setToggle] = useState(true);
	// Obtention de l'URL actuelle
	const location = useLocation();

	// Fonction pour basculer l'état du menu déroulant
	const handleToggle = () => {
		setToggle(!toggle);
	};

	// Effet pour mettre à jour l'état du menu déroulant en fonction de l'URL
	useEffect(() => {
		if (location.pathname === "/") {
			setToggle(true);
		} else {
			setToggle(false);
		}
	}, [location.pathname]);

	return (
		<header>
			<nav className={styles.navbar}>
				<div className={styles.navbarLogo}>
					<NavLink to="/">
						<img width={300} height={276} src={logo} alt="logo wealth health" />
						<h1> WEALTH HEALTH </h1>
					</NavLink>
				</div>

				<div className={styles.navbarToggle}>
					<NavLink to={toggle ? "/employees" : "/"} onClick={handleToggle}>
						{/*{toggle ? (
							<FontAwesomeIcon icon={faHouse} className={styles.iconHome} />
						) : (
							<FontAwesomeIcon icon={faUsers} className={styles.iconUser} />
						)}*/}
						<span>{toggle ? "Home" : "Employees"}</span>
					</NavLink>
				</div>
			</nav>
		</header>
	);
};

export default Header;
