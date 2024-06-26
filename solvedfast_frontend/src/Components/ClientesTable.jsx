import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#e4e4e4",
        textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: "center",
    },
}));

const StyledTableRow = styled(TableRow)(({}) => ({
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));


export default function ClientesTable({ rows, page, setPage, rowsPerPage, setRowsPerPage, totalRows, updateCliente, deleteCliente }) {

    console.log(rows)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };
    

    /* Delete Confirmation */
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selectedTecnico, setSelectedTecnico] = useState(null);

    const handleDeleteOpen = (tecnico) => {
        setSelectedTecnico(tecnico);
        setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
        setSelectedTecnico(null);
        setDeleteOpen(false);
    };

    const handleDeleteConfirm = () => {
        deleteCliente(selectedTecnico._id);
        handleDeleteClose();
    };


    return (
        <Paper>
            <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
                <Table name={"cliente-list"} sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nombres</StyledTableCell>
                            <StyledTableCell>Apellidos</StyledTableCell>
                            <StyledTableCell>Distrito</StyledTableCell>
                            <StyledTableCell>Dirección</StyledTableCell>
                            <StyledTableCell>Provincia</StyledTableCell>
                            <StyledTableCell>Referencia</StyledTableCell>
                            <StyledTableCell>Comentarios</StyledTableCell>
                            <StyledTableCell>Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ? rows.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell>{row.nombres}</StyledTableCell>
                                <StyledTableCell>{`${row.apellido_paterno} ${row.apellido_materno}`}</StyledTableCell>
                                <StyledTableCell>{row.distrito}</StyledTableCell>
                                <StyledTableCell>{row.direccion}</StyledTableCell>
                                <StyledTableCell>{row.provincia}</StyledTableCell>
                                <StyledTableCell>{row.referencia}</StyledTableCell>
                                <StyledTableCell>{row.comentario}</StyledTableCell>
                                <StyledTableCell>
                                    <IconButton
                                        aria-label="edit"
                                        color="warning"
                                        onClick={() => updateCliente(row)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => handleDeleteOpen(row)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        )) : null }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>

            {selectedTecnico && (
                <DeleteConfirmationDialog
                    open={deleteOpen}
                    handleClose={handleDeleteClose}
                    handleConfirm={handleDeleteConfirm}
                    selectedPersonInfo={selectedTecnico.nombres + " " + selectedTecnico.apellido_materno + " " + selectedTecnico.apellido_paterno}
                />
            )}
        </Paper>
    );
}
