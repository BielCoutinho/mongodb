/**
 * Processo principal
 * Estudo do CRUD com MongDB
 */

//Importação do módulo de conexão (database.js)
const {conectar, desconectar } = require('./database.js')

// Immportação do modelo de dados de clientes
const clienteModel = require('./src/models/Clientes.js')

//CRUD Create (função para adicionar um novo cliente)
const criarCliente = async (nomeCli, foneCli) => {
    try {
        const novoCliente = new clienteModel (
            {
            nomeCliente: nomeCli,
            foneCliente: foneCli

            }
            
        )
        // A linha abaixo salva os dados do cliente no banco
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso ")
    } catch (error) {
        console.log(error)
        
    }
}

const criarCliente1 = async (nomeCli1, foneCli1) => {
    try {
        const novoCliente1 = new clienteModel (
            {
            nomeCliente: nomeCli1,
            foneCliente: foneCli1

            }
            
        )
        // A linha abaixo salva os dados do cliente no banco
        await novoCliente1.save()
        console.log("Cliente adicionado com sucesso ")
    } catch (error) {
        console.log(error)
        
    }
}

//exexução de aplicação 
const app = async () => {
    await conectar()
    await criarCliente("Coutinho", "99999-0000")
    await desconectar()
}

console.clear()
app()
