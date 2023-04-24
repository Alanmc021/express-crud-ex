const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [
   { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
   { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com' }
];

// Rota GET para exibir todos os usuários
app.get('/users', (req, res) => {
   res.send(users);
});

// Rota GET para exibir um usuário específico
app.get('/users/:id', (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if (!user) res.status(404).send('Usuário não encontrado');
   res.send(user);
});

// Rota POST para criar um novo usuário
app.post('/users', (req, res) => {
   const user = {
      id: users.length + 1,
      name: req.body.name,
      email: req.body.email
   };
   users.push(user);
   res.send(user);
});

// Rota PUT para atualizar um usuário existente
app.put('/users/:id', (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if (!user) res.status(404).send('Usuário não encontrado');
   user.name = req.body.name;
   user.email = req.body.email;
   res.send(user);
});

// Rota DELETE para excluir um usuário existente
app.delete('/users/:id', (req, res) => {
   const user = users.find(u => u.id === parseInt(req.params.id));
   if (!user) res.status(404).send('Usuário não encontrado');
   const index = users.indexOf(user);
   users.splice(index, 1);
   res.send(user);
});

app.listen(port, () => {
   console.log(`Servidor rodando na porta ${port}`);
});