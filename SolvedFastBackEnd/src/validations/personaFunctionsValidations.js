// Function to validate nombres, apellido_paterno, and apellido_materno
export const validateNames = (field, fieldName) => {
    const errors = [];
    if (!field) {
        errors.push(`${fieldName} es requerido`);
    } else {
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñÜü]+)*$/.test(field)) {
            errors.push(`Solo se permiten letras y espacios en ${fieldName}`);
        } else if (field.replace(/\s+/g, ' ').trim().length > 25) {
            errors.push(`${fieldName} demasiado largo`);
        }
    }
    return errors;
};

export const validateComentario = (comentario) => {
    const errors = [];

    // Check if comentario exists and is a string
    if (comentario && typeof comentario !== "string") {
        errors.push("Comentario debe ser una cadena de caracteres");
    } 

    // Check the length of comentario
    if (comentario && comentario.length > 120) {
        errors.push("Comentario debe tener 120 caracteres o menos");
    }

    return errors;
};