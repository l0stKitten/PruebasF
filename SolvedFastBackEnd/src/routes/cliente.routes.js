import { Router } from "express";
const router = Router();

import {
  createCliente,
  deleteCliente,
  updateCliente,
  getAllClientes,
} from "../controllers/cliente.controller.js";

router.get("/clientes", getAllClientes);
router.post("/cliente", createCliente);
router.put("/cliente/:id", updateCliente);
router.delete("/cliente/:id", deleteCliente);

export default router;
