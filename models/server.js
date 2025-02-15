const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
     constructor() {
	 this.app = express();
	 this.port = process.env.PORT;

	 this.paths = {
	     users: '/api/users',
	     auth: '/api/auth',
	     recipes: '/api/recipes'
	 }
	 this.conectarDB();
	 this.middlewares();
	 this.routes();
     }

    async conectarDB() {
	await dbConnection();
    };


    middlewares() {
	this.app.use(cors({origin: 'http://localhost:4200', credentials: true}));//esto le agregue para conectarme a la UI
	this.app.use(express.json());
    }

    routes() {
	this.app.use(this.paths.users, require('../routes/users'));
	this.app.use(this.paths.auth, require('../routes/auth'));
	this.app.use(this.paths.recipes, require('../routes/recipes'));
    }

    listen() {
	this.app.listen(this.port, () => {
	    console.log('Servidor corriendo en puerto:', this.port);
	});
    }
}

module.exports = Server;
