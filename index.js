require('dotenv').config();
const Server = require ('./model/server');
const servidorIniciado = new Server();
servidorIniciado.listen();