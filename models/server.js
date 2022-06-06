const express = require("express");
const cors = require("cors");
const router = require("../routes/user.routes");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.usuariosPath = "/api/usuarios";

		//Middlewares
		this.middlewares();
		//Rutas de mi aplicacion
		this.routes();
	}

	middlewares() {
		//CORS
		this.app.use(cors());
		//Lectura y parseo del body
		this.app.use(express.json());
		//directorio publico
		this.app.use(express.static("public"));
	}

	routes() {
		this.app.use(this.usuariosPath, require("../routes/user.routes"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("app escuchando el el puerto 8080");
		});
	}
}

module.exports = Server;
