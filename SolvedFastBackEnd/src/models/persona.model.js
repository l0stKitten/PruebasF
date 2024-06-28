import mongoose from "mongoose";
const Schema = mongoose.Schema;

const trimSpaces = (v) => v.replace(/\s+/g, " ").trim().toUpperCase();

const personaSchema = new Schema(
  {
    nombres: {
      type: String,
      required: [true, "Los nombres son requeridos"],
      maxlength: [25, "Los nombres no pueden tener más de 25 caracteres"],
      set: trimSpaces,
    },
    apellido_paterno: {
      type: String,
      required: [true, "Apellido paterno es requerido"],
      maxlength: [25, "Apellido paterno no puede tener más de 25 caracteres"],
      set: trimSpaces,
    },
    apellido_materno: {
      type: String,
      required: [true, "Apellido materno es requerido"],
      maxlength: [25, "Apellido materno no puede tener más de 25 caracteres"],
      set: trimSpaces,
    },
    fecha_creacion: {
      type: Date,
      default: Date.now,
    },
  },
  {
    discriminatorKey: "tipoPersona",
    collection: "personas",
  }
);

export default mongoose.model("Persona", personaSchema);
