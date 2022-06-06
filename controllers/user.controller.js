const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
	const { q, nombre, apikey } = req.query;

	res.json({
		ok: true,
		msg: "get API - controlador",
		q,
		nombre,
		apikey,
	});
};

const usuariosPost = (req, res) => {
	const { nombre, edad } = req.body;

	res.json({
		msg: "Post API - controlador",
		nombre,
		edad,
	});
};

const usuariosPut = (req, res) => {
	const id = req.params.id;

	res.json({
		msg: "Put API - controlador",
		id,
	});
};

const usuariosPatch = (req, res) => {
	res.json({
		msg: "Patch API - controlador",
	});
};

const usuariosDelete = (req, res) => {
	res.json({
		msg: "Delete API - controlador",
	});
};

module.exports = {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
};
