import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useState } from "react";
import EditModal from "./EditModal";

const InfoTable = ({ deleteEntry, tableData, updateTable }: any) => {
	const [showModal, setShowModal] = useState(false);
	const [userId, setUserId] = useState();

	const closeModal = () => {
		setShowModal(false);
	};

	return (
		<div className="table-container">
			<TableContainer>
				<Table>
					<TableHead className="table-header">
						<TableRow>
							<TableCell>Sr No</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Contact</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Weekday</TableCell>
							<TableCell>Gender</TableCell>
							<TableCell>Dob</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					{tableData.map((val: any, i: number) => (
						<TableBody key={i}>
							<TableRow>
								<TableCell>{i + 1}</TableCell>
								<TableCell>{val.name}</TableCell>
								<TableCell>{val.contact}</TableCell>
								<TableCell>{val.email}</TableCell>
								<TableCell>
									{val.weekdays.map((item: any, j: number) => (
										<div key={j}>{item} </div>
									))}
								</TableCell>
								<TableCell>{val.gender}</TableCell>
								<TableCell>{val.dob}</TableCell>
								<TableCell>
									<div className="button-container">
										<Button
											className="delete"
											variant="contained"
											color="error"
											onClick={() => {
												deleteEntry(val._id);
											}}
										>
											<DeleteIcon />
											Delete
										</Button>
										<Button
											className="edit"
											variant="contained"
											onClick={() => {
												setShowModal(true);
												setUserId(val._id);
											}}
										>
											<EditIcon />
											Edit
										</Button>
									</div>
								</TableCell>
							</TableRow>
						</TableBody>
					))}
				</Table>
			</TableContainer>

			<EditModal
				id={userId}
				formData={tableData?.find((params: any) => params._id == userId)}
				show={showModal}
				updateTable={updateTable}
				hide={closeModal}
			/>
		</div>
	);
};

export default InfoTable;
