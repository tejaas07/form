import Forms from "./Forms";

const FormContainer = ({ updateTable }: any) => {
	return (
		<>
			<div className="form-container">
				<Forms updateTable={updateTable} />
			</div>
		</>
	);
};

export default FormContainer;
