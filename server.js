const port = 3003
const express = require('express')
const app = express()

const BodyParser = require('body-parser')
const database = require('./database')

app.use(BodyParser.urlencoded({extended:true}))  //bodyParser é função middleware, que transforma urlencodded via parse em um objeto


/*
app.get('/produtos',(req,res,next) =>{  // caso fosse necessario passar uma middleware (1)
    console.log('middleware 1')
    next()
})

app.use((req,res,next) =>{       //  independente do que for feito após http://localhost:3003/  ele sempre ira acessar {nome: 'Notebook', preco: 123.45}
    console.log('middleware 1')
    next()
})
*/

app.get('/produtos',(req,res,next) =>{   //Next é opcional aqui, pois na verdade não será usado

    res.send(database.getTodosProdutos())  //convertido em json automaticamente pelo método send

})

app.get('/produtos/:id',(req,res,next) => {  

    res.send(database.getProduto(req.params.id))  //Params guarda os parametros das requisições de :id no caso

})

app.post('/produtos',(req,res,next)=>{
    
    const produto = database.salvarProduto({
        nome: req.body.nome,                           //Nesse caso o body será submetido via postman
        preco: req.body.preco
    })
    res.send(produto) // JSON

})

app.put('/produtos/:id',(req,res,next)=>{
    
    const produto = database.salvarProduto({
        id:req.params.id,
        nome: req.body.nome,                           
        preco: req.body.preco
    })
    res.send(produto) // JSON

})

app.delete('/produtos/:id',(req,res,next)=>{
    
    const produto = database.excluirProduto(req.params.id)
    res.send(produto) // JSON

})




app.listen(port, () => {    //App.listen executa a callback
    console.log(`Servidor sendo executado na porta:${port}.`)
})

/* Caso tente acessar o terminal Javascript\Node\projeto_postman> node src/server.js  resultara em erro, pois a porta está ocupada.  */