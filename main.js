/**
 * Processo principal
 * Estudo do CRUD com MongDB
 */

//Importação do módulo de conexão (database.js)
const {conectar, desconectar } = require('./database.js')

// Immportação do modelo de dados de clientes
const clienteModel = require('./src/models/Clientes.js')

//importação do pacote string-similarity para aprimorar a busca por nome
const stringSimilarity = require('string-similarity')

//CRUD Create (função para adicionar um novo cliente)
const criarCliente = async (nomeCli, foneCli, cpfCli) => {
    try {
        const novoCliente = new clienteModel (
            {
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli

            }
            
        )
        // A linha abaixo salva os dados do cliente no banco
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso ")
    } catch (error) {
        //tratamento de exceções especificas 
        if(error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
        console.log(error)
        
    }
}

// CRUD Read - Função para listar todos os clientes cadastrados
const listarCLientes = async () => {
    try {
        // a linha abaixo lista todos os clientes cadastrados por ordem alfabética
        
        const clientes = await clienteModel.find().sort(
            {
                nomeCliente: 1
            }
        )
        console.log(clientes)
    } catch (error) {
        console.log(error)
        
    }
}

// CRUD Read - Função par buscar um cliente específico
const buscarCliente = async (nome) => {
    try {
        // find() - buscar no banco de dados
        //nomeCliente: new RegExp (nome) filtrar pelo nome (partes que contenham (expressão regular)) 
        // 'i' insensitive (iginorar maiúsculas óu minúsculas)
        const cliente = await clienteModel.find(
            {
                nomeCliente: new RegExp(nome, 'i')
            }
    ) 

    // calcular a similariedade entre os nomes retornados e o nome pesquisado
const nomesClientes = cliente.map(cliente => cliente.nomeCliente)
// validação (se não existir o cliente pesquisado)
if (nomesClientes.length === 0){
    console.log("Cliente não cadastrado")
} else {
    const match = stringSimilarity.findBestMatch(nome, nomesClientes)
    //clientes com melhor similaridade
const melhorCliente = cliente.find(cliente => cliente.nomeCliente == match.bestMatch.target)
//formatação da data
const clienteFormatado = {
    nomeCliente: melhorCliente.nomeCliente,
    foneCliente: melhorCliente.foneCliente,
    cpf: melhorCliente.cpf,
    dataCadastro: melhorCliente.dataCadastro.toLocaleDateString('pt-BR')
}
console.log(clienteFormatado)

}

    
    } catch (error) {
        console.log(error)
        
    }
}



//exexução de aplicação 
const app = async () => {
    await conectar()
    //CRUD - Create
    // await criarCliente("Coutinho", "99999-0000", "123.154.520-00")

    //CRUD-Read (Exemplo 1 - listar todos clientes)
    //await listarCLientes()

    //CRUD-Read (Exemplo 2 - listar todos clientes)
    await buscarCliente(" ")
    

    


    await desconectar()
}

console.clear()
app()
