const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
	//const { q, nombre, apikey } = req.query;
	const { limite = 5, desde = 0 } = req.query;
	const query = { estado: true };

	/* const usuarios = await Usuario.find(query)
		.skip(Number(desde))
		.limit(Number(limite));

	const total = await Usuario.countDocuments(query); */

	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments(query),
		Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
	]);

	res.json({
		total,
		usuarios,
		/* total,
		usuarios, */
	});
};

const usuariosPost = async (req, res) => {
	const { nombre, correo, password, rol } = req.body;
	const usuario = new Usuario({ nombre, correo, password, rol });

	//Verificar si el correo existe

	//Encriptar la contraseña
	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);
	//Guardar en base de datos
	await usuario.save();

	res.json({
		usuario,
	});
};

const usuariosPut = async (req, res) => {
	const id = req.params.id;
	const { password, google, correo, ...resto } = req.body;
	//Validar cotra base de datos
	if (password) {
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json(usuario);
};

const usuariosPatch = (req, res) => {
	res.json({
		msg: "Patch API - controlador",
	});
};

const usuariosDelete = async (req, res = response) => {
	const { id } = req.params;

	//Borrar fisicamente
	//const usuario = await Usuario.findByIdAndDelete(id);

	const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

	res.json({
		usuario,
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
};
