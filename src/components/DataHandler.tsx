import { useState } from "react";
import Table from "./InfoTable";
import FormContainer from "./FormContainer";
import { toast } from "react-toastify";

interface FormData {
	name: string;
	email: string;
	contact: string;
	weekdays: string[];
	gender: string;
	dob: Date | "";
	_id?: string | null;
}

const DataHandler = ({}) => {
	const [tableData, setTableData] = useState<FormData[]>([]);

	const updateTableData = (data: any) => {
		setTableData((prevTableData) => [...prevTableData, data]);
	};
	const updateEntry = (data: any) => {
		console.log(data);
		setTableData((prevTableData) => {
			return prevTableData.map((item) => {
				if (item._id === data._id) {
					return { ...data, _id: item._id };
				}
				return item;
			});
		});
	};

	const deleteEntry = (entry: any) => {
		console.log(entry);
		setTableData(tableData.filter((item) => item._id != entry));
		toast.success("Entry deleted successfully.", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
		});
	};

	return (
		<>
			<FormContainer updateTable={updateTableData} />
			<div className="display-data">
				{tableData.length > 0 ? (
					<Table
						tableData={tableData}
						updateTable={updateEntry}
						deleteEntry={deleteEntry}
					/>
				) : (
					<div className="no-entry-display">
						Submitted Form data will be displayed here
					</div>
				)}
			</div>
		</>
	);
};

export default DataHandler;
