const express = require('express');
const app = express();
const PORT = 3333;

// Lista de pessoas (simulando um "banco de dados" em memória)
let pessoas = [];

// Adiciona um middleware para trabalhar com json nas reqs.
app.use(express.json());

const logHoraMiddleware = (req, res, next) => {
    const horaAtual = new Date().toISOString();
    console.log(
      `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
      );
    next(); // Chamar next() para passar a solicitação para o próximo middleware
  };

app.use(logHoraMiddleware())

app.get('/', (req, res) => {
    res.json("Sucesso!");
});

// Rota para obter todas as pessoas
app.get('/pessoas', (req, res) => { 
    res.json(pessoas);
});

// Rota para obter uma pessoa por ID
app.get('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const pessoa = pessoas.find(pessoa => pessoa.id === parseInt(id));
    if (!pessoa) {
        res.status(404).send('Pessoa não encontrada.');
        return;
    }
    res.json(pessoa);
});

// Rota para adicionar uma nova pessoa
app.post('/pessoas', (req, res) => {
    const pessoa = req.body;
    pessoa.id = pessoas.length > 0 ? pessoas[pessoas.length - 1].id + 1 : 1;
    pessoas.push(pessoa);
    res.status(201).send('Pessoa adicionada com sucesso.');
});

// Rota para atualizar uma pessoa por ID
app.put('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const newData = req.body;
    const index = pessoas.findIndex(pessoa => pessoa.id === parseInt(id));
    if (index === -1) {
        res.status(404).send('Pessoa não encontrada.');
        return;
    }
    pessoas[index] = { ...pessoas[index], ...newData };
    res.status(200).send('Pessoa atualizada com sucesso.');
});

// Rota para deletar uma pessoa por ID
app.delete('/pessoas/:id', (req, res) => {
    const { id } = req.params;
    const index = pessoas.findIndex(pessoa => pessoa.id === parseInt(id));
    if (index === -1) {
        res.status(404).send('Pessoa não encontrada.');
        return;
    }
    pessoas.splice(index, 1);
    res.status(200).send('Pessoa deletada com sucesso.');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
