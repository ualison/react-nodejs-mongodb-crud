const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const gameRoute = require('./game.route');

const url = 'mongodb://localhost:27017/reactcrud'; 

mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true }).then(
  () => {console.log('Banco de dados conectado!') },
  err => { console.log('Não é possível fazer a conexão: '+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/game', gameRoute);

app.listen(PORT, function(){
  console.log('Servidor iniciado na porta:',PORT);
});