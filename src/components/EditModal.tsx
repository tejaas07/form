import Modal from "@mui/material/Modal";
import Forms from "./Forms";

const EditModal = ({ updateTable, formData, show, hide }: any) => {
	return (
		<>
			<Modal
				open={show}
				onClose={hide}
				// aria-labelledby="modal-modal-title"
				// aria-describedby="modal-modal-description"
			>
				<div className="modal">
					<div className="modal-form-container"></div>
					<Forms updateTable={updateTable} formData={formData} hide={hide} />
				</div>
			</Modal>
		</>
	);
};

export default EditModal;
