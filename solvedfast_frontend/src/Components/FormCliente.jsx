import * as React from "react";
import { Fragment, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import { useState } from "react";


import clienteSchema from "../js/clienteSchema";

export default function FormCliente({
	open,
	title,
	handleClose,
	formValues,
	handleChange,
	handleSubmitForm,
}) {
	const [errors, setErrors] = useState({});

	const validateForm = async () => {
		try {
			await clienteSchema.validate(formValues, { abortEarly: false });
			setErrors({});
			handleSubmitForm(); 
		} catch (err) {
		const validationErrors = {};
			if (err.inner) {
				err.inner.forEach((error) => {
				validationErrors[error.path] = error.message;
				});
			}
			setErrors(validationErrors);
			console.log("Validation errors:", validationErrors);
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault(); // Ensure this is called on a form submit event
		validateForm();
	};

	return (
		<Fragment>
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
			<form onSubmit={handleFormSubmit}>
				<Grid container spacing={2} mb={2}>


					<Grid item xs={12} sm={6}>
					<TextField
						required
						autoFocus
						margin="dense"
						name="nombres"
						id="nombres"
						label="Nombres"
						type="text"
						fullWidth
						variant="outlined"
						value={formValues.nombres}
						onChange={handleChange}
						error={!!errors.nombres}
						helperText={errors.nombres}
					/>
					</Grid>

					<Grid item xs={12} sm={6}>
					<TextField
						required
						margin="dense"
						name="apellido_paterno"
						id="apellido_paterno"
						label="Apellido Paterno"
						type="text"
						fullWidth
						variant="outlined"
						value={formValues.apellido_paterno}
						onChange={handleChange}
						error={!!errors.apellido_paterno}
						helperText={errors.apellido_paterno}
					/>
					</Grid>

					<Grid item xs={12} sm={6}>
					<TextField
						required
						margin="dense"
						name="apellido_materno"
						id="apellido_materno"
						label="Apellido Materno"
						type="text"
						fullWidth
						variant="outlined"
						value={formValues.apellido_materno}
						onChange={handleChange}
						error={!!errors.apellido_materno}
						helperText={errors.apellido_materno}
					/>
					</Grid>

					<Grid item xs={12} sm={6}>
					<TextField
						required
						margin="dense"
						fullWidth
						id="provincia"
						label="Provincia"
						name="provincia"
						value={formValues.provincia}
						onChange={handleChange}
						error={!!errors.provincia}
						helperText={errors.provincia}
					/>
					</Grid>

					<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						margin="dense"
						id="distrito"
						label="Distrito"
						name="distrito"
						value={formValues.distrito}
						onChange={handleChange}
						error={!!errors.distrito}
						helperText={errors.distrito}
					/>
					</Grid>

					<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						margin="dense"
						id="direccion"
						label="Dirección"
						name="direccion"
						value={formValues.direccion}
						onChange={handleChange}
						error={!!errors.direccion}
						helperText={errors.direccion}
					/>
					</Grid>

					<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						id="referencia"
						margin="dense"
						label="Referencia"
						name="referencia"
						value={formValues.referencia}
						onChange={handleChange}
						error={!!errors.referencia}
						helperText={errors.referencia}
					/>
					</Grid>
					
					<Grid item xs={12} sm={6}>
					<TextField
						fullWidth
						id="comentario"
						margin="dense"
						label="Comentario"
						name="comentario"
						multiline={true}
						value={formValues.comentario}
						onChange={handleChange}
						error={!!errors.comentario}
						helperText={errors.comentario}
					/>
					</Grid>
				</Grid>
			</form>

			</DialogContent>
			<DialogActions>
			<Button onClick={handleClose} color="primary">
				Cancelar
			</Button>
			<Button
				onClick={handleFormSubmit}
				color="primary"
				variant="contained"
			>
				Guardar
			</Button>
			</DialogActions>
		</Dialog>
		</Fragment>
	);
}
