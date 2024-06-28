import * as React from "react";
import { Fragment, useState, useEffect } from "react";
import ClientesTable from "../Components/ClientesTable";

import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import { toast } from "react-toastify";

import FormCliente from "../Components/FormCliente";

export default function Clientes() {

  /* Get Clientes */
  const [clientes, setClientes] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalClientes, setTotalClientes] = useState(0);

  const fetchClientes = async (page, rowsPerPage) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/clientes`, {
        params: {
          page: page + 1, // The API expects 1-based page number
          perPage: rowsPerPage,
        },
      });

      console.log(response.data.clientes)
      setClientes(response.data.clientes);
      setTotalClientes(response.data.totalPages * rowsPerPage);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  useEffect(() => {
    fetchClientes(page, rowsPerPage);
  }, [page, rowsPerPage, refresh]);

  /* Create Form Values */
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    documento_identidad: "",
    tipo_documento: "0",
    nombres: "",
    apellido_paterno: "",
    apellido_materno: "",
    distrito: "",
    provincia: "",
    direccion: "",
    referencia: "",
    comentario: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormValues({
      documento_identidad: "",
      tipo_documento: "0",
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      distrito: "",
      provincia: "",
      direccion: "",
      referencia: "",
      comentario: "",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleCreateClienteAnyway = (event) => {
    axios
      .post("http://localhost:8000/api/cliente", formValues)
      .then((response) => {
        handleClose();
        toast.success("Cliente creado exitosamente");
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error creating cliente:", error);
        toast.error("Error al crear el cliente: " + error.response.data.error);
        handleClose();
        setRefresh(!refresh);
      });
  };

  /* Edit Form Values */
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = (row) => {
    setOpen(false);
    setFormValues(row);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);

    setFormValues({
      documento_identidad: "",
      tipo_documento: "0",
      nombres: "",
      apellido_paterno: "",
      apellido_materno: "",
      distrito: "",
      provincia: "",
      direccion: "",
      referencia: "",
      comentario: "",
    });
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/api/cliente/${formValues._id}`, formValues);
     
      handleCloseEdit();
      setRefresh(!refresh);
      toast.success("Cliente actualizado exitosamente");
    } catch (error) {
      console.error("Error updating cliente:", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error("Error al actualizar el cliente: " + error.response.data.error);
      } else {
        toast.error("Error al actualizar el cliente.");
      }
      handleCloseEdit();
      setRefresh(!refresh);
    }
  };

  /* Delete */
  const handleDeleteCliente = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/cliente/${id}`
      );
      setRefresh(!refresh);
      toast.success("Cliente eliminado con éxito");
    } catch (error) {
      toast.error("Error al eliminar suspención cliente: " + error.message);
      setRefresh(!refresh);
    }
  };

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pt: 4, pl: 6, pr: 6 }}
        >
          <Grid item xs={12} md={8}>
            <Typography variant="h2">Clientes</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                color="success"
                variant="contained"
                id="agregar_cliente"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
              >
                AGREGAR CLIENTE
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="flex-end"
          sx={{ pt: 4, pl: 6, pr: 6 }}
        >
          <Grid item xs={12} md={12}>
            <ClientesTable
              rows={clientes}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              totalRows={totalClientes}
              updateCliente={handleClickOpenEdit}
              deleteCliente={handleDeleteCliente}
            ></ClientesTable>
          </Grid>
        </Grid>
      </Box>

      <FormCliente
        open={open}
        title={"Agregar Cliente"}
        handleClose={handleClose}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmitForm={handleCreateClienteAnyway}
      ></FormCliente>

      <FormCliente
        open={openEdit}
        title={"Editar Cliente"}
        handleClose={handleCloseEdit}
        formValues={formValues}
        handleChange={handleChange}
        handleSubmitForm={handleSubmitEdit}
      ></FormCliente>
    </Fragment>
  );
}
