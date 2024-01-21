import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import {
	Checkbox,
	Radio,
	FormControl,
	FormLabel,
	FormControlLabel,
	RadioGroup,
} from "@mui/material";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

interface FormData {
	name: string;
	email: string;
	contact: string;
	weekdays: string[];
	gender: string;
	dob: Date | "";
	_id?: string | null;
}

const validationSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	contact: yup.number().required("Contact is required").min(10),
	weekdays: yup.array().min(1, "Select at least one weekday").of(yup.string()),
	gender: yup.string().required("Gender is required"),
	dob: yup.date().required("Date of Birth is required"),
});

const Forms = ({ updateTable, formData, hide }: any) => {
	const initialValues: FormData = {
		name: formData ? formData.name : "",
		email: formData ? formData.email : "",
		contact: formData ? formData.contact : "",
		weekdays: formData ? formData.weekdays : [],
		gender: formData ? formData.gender : "",
		dob: formData ? formData.dob : "",
		_id: formData ? formData._id : null,
	};

	const handleSubmit = (
		values: FormData,
		{ resetForm }: { resetForm: () => void }
	) => {
		// Handle form submission logic here
		if (formData) {
			console.log("updates", values);
			updateTable(values);
			hide();
			toast.success("Form data updated successfully.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		} else {
			console.log(values);

			values._id = uuidv4();

			updateTable(values);

			toast.success("Form data submitted successfully.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
		// Reset the form after submission
		resetForm();
	};

	return (
		<>
			<div>
				<h1>Please Fill the form</h1>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					<Form>
						<div className="form-fields">
							<div className="form-fields-container">
								<label className="field-label" htmlFor="name">
									Name:
								</label>
								<Field
									className="field"
									type="text"
									id="name"
									name="name"
									label="Name"
								/>
								<div className="error-container">
									<ErrorMessage name="name" component="div" />
								</div>
							</div>

							<div className="form-fields-container">
								<label className="field-label" htmlFor="email">
									Email:
								</label>
								<Field className="field" type="email" id="email" name="email" />
								<div className="error-container">
									<ErrorMessage name="email" component="div" />
								</div>
							</div>

							<div className="form-fields-container">
								<label className="field-label" htmlFor="contact">
									Contact:
								</label>
								<Field
									className="field"
									type="number"
									id="contact"
									name="contact"
								/>
								<div className="error-container">
									<ErrorMessage name="contact" component="div" />
								</div>
							</div>

							<div className="form-fields-container">
								<label className="field-label" htmlFor="dob">
									Date of Birth:
								</label>
								<Field className="field" type="date" id="dob" name="dob" />
								<div className="error-container">
									<ErrorMessage name="dob" component="div" />
								</div>
							</div>

							<div className="form-fields-container">
								<FormControl component="fieldset">
									<div className="checkbox-container">
										<FormLabel className="field-label" component="legend">
											Gender:
										</FormLabel>
										<RadioGroup aria-label="gender" name="gender">
											<div>
												<FormControlLabel
													control={
														<Field
															as={Radio}
															type="radio"
															name="gender"
															value="Male"
														/>
													}
													label="Male"
												/>
												<FormControlLabel
													control={
														<Field
															as={Radio}
															type="radio"
															name="gender"
															value="Female"
														/>
													}
													label="Female"
												/>
											</div>
										</RadioGroup>
									</div>
								</FormControl>
								<div className="error-container">
									<ErrorMessage
										name="gender"
										component="div"
										className="error-message"
									/>
								</div>
							</div>

							<div className="form-fields-container">
								<label>Weekday:</label>
								<Field
									type="checkbox"
									as={Checkbox}
									name="weekdays"
									value="Monday"
								/>
								<label>Monday</label>
								<Field
									type="checkbox"
									as={Checkbox}
									name="weekdays"
									value="Tuesday"
								/>
								<label>Tuesday</label>

								<Field
									type="checkbox"
									as={Checkbox}
									name="weekdays"
									value="Wednesday"
								/>
								<label>Wednesday</label>

								<Field
									type="checkbox"
									as={Checkbox}
									name="weekdays"
									value="Thursday"
								/>
								<label>Thursday</label>

								<Field
									type="checkbox"
									as={Checkbox}
									name="weekdays"
									value="Friday"
								/>
								<label>Friday</label>

								<div className="error-container">
									<ErrorMessage name="weekdays" component="div" />
								</div>
							</div>

							<button className="primary-button" type="submit">
								Submit
							</button>
						</div>
					</Form>
				</Formik>
			</div>

			{/* <Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				<Form>
					<div>
						<label>Name:</label>
						<Field type="text" as={TextField} name="name" />
						<ErrorMessage name="name" component="div" />
					</div>

					<div>
						<label>Email:</label>
						<Field type="email" as={TextField} name="email" />
						<ErrorMessage name="email" component="div" />
					</div>

					<div>
						<label>Contact:</label>
						<Field type="number" as={TextField} name="contact" />
						<ErrorMessage name="contact" component="div" />
					</div>

					<div>
						<label>Weekday (Monday to Friday):</label>
						<Field
							type="checkbox"
							as={Checkbox}
							name="weekdays"
							value="Monday"
						/>
						<Field
							type="checkbox"
							as={Checkbox}
							name="weekdays"
							value="Tuesday"
						/>
						<Field
							type="checkbox"
							as={Checkbox}
							name="weekdays"
							value="Wednesday"
						/>
						<Field
							type="checkbox"
							as={Checkbox}
							name="weekdays"
							value="Thursday"
						/>
						<Field
							type="checkbox"
							as={Checkbox}
							name="weekdays"
							value="Friday"
						/>
						<ErrorMessage name="weekdays" component="div" />
					</div>

					<div>
						<label>Gender (Male and Female):</label>
						<Field type="radio" as={Radio} name="gender" value="Male" />
						<Field type="radio" as={Radio} name="gender" value="Female" />
						<ErrorMessage name="gender" component="div" />
					</div>

					<div>
						<label>Date of Birth (By using calendar):</label>
					</div>
					<Field className="field" type="date" id="dob" name="dob" />
					<ErrorMessage name="dob" component="div" />
					<div>
						<Button type="submit" variant="contained" color="primary">
							Submit
						</Button>
					</div>
				</Form>
			</Formik> */}
		</>
	);
};

export default Forms;
