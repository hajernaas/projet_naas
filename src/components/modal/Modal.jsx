import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ onClose }) => {
	const modalRef = useRef(null); //référence pour accéder directement au DOM de la modale
	const lastFocusElement = useRef(null); //référence pour stocker l'élément qui avait le focus avant l'ouverture de la modale.

	useEffect(() => {
		// Enregistrer l'élément actuellement focalisé
		lastFocusElement.current = document.activeElement;

		// Déplacer le focus sur la modale
		modalRef.current.focus();

		// Masquer le reste du contenu du body
		document.body.setAttribute("aria-hidden", "true");

		// Ajouter l'écouteur d'événements pour la touche Escape
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", onKeyDown);

		return () => {
			// Restaurer le focus sur l'élément précédemment focalisé
			if (lastFocusElement.current) {
				lastFocusElement.current.focus();
			}

			document.removeEventListener("keydown", onKeyDown);

			document.body.removeAttribute("aria-hidden");
		};
	}, [onClose]);

	return (
		<div
			className={styles.modalContainer}
			data-testid="modal-container"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			ref={modalRef}
			tabIndex="-1">
			<div className={styles.modalContent}>
				<h2 id="modal-title">Employee Created</h2>
				<button
					aria-label="Close modal"
					className={styles.closeModal}
					data-testid="close-modal"
					onClick={onClose}>
					X
				</button>
			</div>
		</div>
	);
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default Modal;
