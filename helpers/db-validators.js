const role = require("../models/role");
const Usuario = require("../models/usuario");
//Verificar si el rol existe
const esRolValido = async (rol = "") => {
	const existeRol = await role.findOne({ rol });
	if (!existeRol) {
		throw new Error("Debe ingresar un  rol valido");
	}
};
//Verificar si el id existe
const existeUsuarioPorId = async (id = "") => {
	const existeId = await Usuario.findById(id);
	if (!existeId) {
		throw new Error("Este id no se encuentra registrado");
	}
};

//Verificar si el email existe
const existeEmail = async (correo = "") => {
	const email = await Usuario.findOne({ correo });
	if (email) {
		throw new Error("Este correo ya esta registrado");
	}
};

module.exports = {
	esRolValido,
	existeEmail,
	existeUsuarioPorId,
};
