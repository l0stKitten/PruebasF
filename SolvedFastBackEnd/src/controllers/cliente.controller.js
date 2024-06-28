import Cliente from "../models/cliente.model.js";
import validationCliente from "../validations/clienteValidation.js";

export const createCliente = async (req, res) => {
  const errors = await validationCliente(req.body);

    // If there are errors, return them
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

  const {
    nombres,
    apellido_paterno,
    apellido_materno,
    distrito,
    provincia,
    direccion,
    referencia,
    comentario,
  } = req.body;

  const cliente = new Cliente({
    nombres,
    apellido_paterno,
    apellido_materno,
    distrito,
    provincia,
    direccion,
    referencia,
    comentario,
  });

  try {
    await cliente.save();
    res.json(cliente);
  } catch (err) {
    res.json({ error: "Hubo un error al guardar el cliente: " + err.message });
    console.log(err);

    return;
  }
};

const checkClienteExists = async (id) => {
  try {
      const cliente = await Cliente.findById(id);
      return !!cliente; // Convert to boolean
  } catch (err) {
      console.error("Error al verificar que el cliente existe:", err);
      return false;
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;

  console.log(req.params)
  console.log(req.body)
  const exists = await checkClienteExists(id);
    if (!exists) {
        return res.status(404).json({ error: "El cliente no existe" });
    }

    const errors = await validationCliente(req.body);

    // If there are errors, return them
    if (errors.length > 0) {
      console.log(errors)
      return res.status(400).json({ errors });
    }

  const {
    nombres,
    apellido_paterno,
    apellido_materno,
    distrito,
    provincia,
    direccion,
    referencia,
    comentario,
  } = req.body;

  try {
    await Cliente.findByIdAndUpdate(id, {
      nombres,
      apellido_paterno,
      apellido_materno,
      distrito,
      provincia,
      direccion,
      referencia,
      comentario,
    });

    res.json({ _id: id, ...req.body });
  } catch (err) {
    res.json({ error: "Hubo un error al guardar el cliente: " + err.message });
  }
};

export const getAllClientes = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page number
  const perPage = parseInt(req.query.perPage) || 10; // Clients per page

  try {
    const clientes = await Cliente.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalClientes = await Cliente.countDocuments();

    res.json({
      clientes,
      currentPage: page,
      totalPages: Math.ceil(totalClientes / perPage),
    });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al obtener los clientes" });
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;

  const exists = await checkClienteExists(id);
    if (!exists) {
        return res.status(404).json({ error: "El cliente no existe" });
    }

  try {
    const clienteEliminado = await Cliente.findOneAndDelete({ _id: id });

    if (!clienteEliminado) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    /*await servicioModel.deleteMany({cliente: clienteEliminado._id});*/

    return res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el cliente:", error);
    return res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};
