const { dbConection } = require("../database/config");
const express = require("express");
const cors = require("cors");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      partidos: '/api/partidos',
      
    };
    //conectar DB
    this.conectarDB();

    //middlewares
    this.middlewares();

    //rutas de la app
    this.routes();

  }
  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del Body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }
  //Función de conexión
  async conectarDB() {
    await dbConection();
  }

  
  routes() {
    this.app.use(this.paths.partidos, require('../routes/partidos'));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto ", this.port);
    });
  }
}
//Importamos la clase Server
module.exports = Server;
