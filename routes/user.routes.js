const { Router } = require("express");
const { check } = require("express-validator");
const Role = require("../models/role");
const {
	usuariosGet,
	usuariosPost,
	usuariosPut,
	usuariosPatch,
	usuariosDelete,
} = require("../controllers/user.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const {
	esRolValido,
	existeEmail,
	existeUsuarioPorId,
} = require("../helpers/db-validators");
const router = Router();

router.get("/", usuariosGet);

router.put(
	"/:id",
	[
		check("id", "No es un ID valido").isMongoId(),
		validarCampos,
		check("id").custom(existeUsuarioPorId),
		check("rol").custom(esRolValido),
	],
	usuariosPut
);

router.post(
	"/",
	[
		check("correo", "El correo no es valido").isEmail(),
		check("correo").custom(existeEmail),
		check("nombre", "Este nombre es obligtorio").not().isEmpty(),
		check("password", "El minimo de caracteres es 6").isLength({ min: 6 }),
		/* check("rol", "debe ingresar un rol valido").isIn([
			"ADMIN_ROLE",
			"USER_ROLE",
		]), */
		check("rol").custom(esRolValido),
		validarCampos,
	],
	usuariosPost
);

router.delete(
	"/:id",
	[
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(existeUsuarioPorId),
		validarCampos,
	],
	usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
