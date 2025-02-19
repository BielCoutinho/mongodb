/**
 * Processo principal
 * Estudo do CRUD com MongDB
 */

//Importação do módulo de conexão (database.js)
const {conectar, desconectar } = require('./database.js')

//exexução de aplicação 
const app = async () => {
    await conectar()
    await desconectar()
}

console.clear()
app()
