const express = require('express');
const app = express();
const PORT = 3666;

// Middleware para registrar o horário de cada solicitação recebida
const logHoraMiddleware = (req, res, next) => {
  const horaAtual = new Date().toISOString();
  console.log(
    `[${horaAtual}] Nova solicitação recebida para: ${req.method} ${req.originalUrl}`
    );
  next(); // Chamar next() para passar a solicitação para o próximo middleware
};

const logHoraMiddleware2 = (req, res, next) => {
  console.log("Salvar Requisição no BD")
  next(); // Chamar next() para passar a solicitação para o próximo middleware
};

const logHoraMiddleware3 = (req, res, next) => {
  console.log("Validar os dados do Yup")
  next(); // Chamar next() para passar a solicitação para o próximo middleware
};

// Usar o middleware em todas as solicitações
// app.use(logHoraMiddleware);

// Rota de exemplo
app.get('/', logHoraMiddleware, logHoraMiddleware2, (req, res) => {
  res.send('Olá, mundo!');
});

app.post('/', logHoraMiddleware, logHoraMiddleware2,  logHoraMiddleware3,(req, res) => {
  res.send('Olá, mundo!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
