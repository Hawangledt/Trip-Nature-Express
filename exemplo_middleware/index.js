const express = require('express');
const yup = require('yup');

const app = express();
const PORT = 3555;

// Definindo um esquema de validação usando Yup
const schemaCriarPessoa = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  idade: yup.number().positive().integer().required(),
});

// Middleware de validação de dados
const validarCriarPessoa = async (req, res, next) => {
  const { body } = req;

  try {
    // Validar os dados recebidos no corpo da solicitação
    await schema.validate(body, { abortEarly: false });
    next(); // Se os dados forem válidos, chame o próximo middleware
  } catch (erro) {
    // Se houver erros de validação, retorne uma resposta com status 400 (Bad Request)
    res.status(400).json({ erro: erro.errors });
  }
};

// Rota POST para inserir dados
app.post('/pessoas', validarCriarPessoa, (req, res) => {
  // Se chegarmos aqui, os dados foram validados com sucesso
  const { nome, email, idade } = req.body;
  // Aqui você pode adicionar a lógica para inserir os dados em um banco de dados, por exemplo
  res.status(201).json({ mensagem: 'Pessoa adicionada com sucesso', dados: req.body });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
