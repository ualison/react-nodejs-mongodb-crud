const express = require('express');
const gameRoutes = express.Router();

let Game = require('./game.model');

gameRoutes.route('/add').post(function (req, res) {
  let game = new Game(req.body);
  game.save()
    .then(game => {
      res.status(200).json({'game': 'Novo jogo adicionado ao BD'});
    })
    .catch(err => {
      res.status(400).send("Habilite para atualizar no BD");
    });
});

gameRoutes.route('/').get(function (req, res) {
    Game.find(function(err, game){
    if(err){
      console.log(err);
    }
    else {
      res.json(game);
    }
  });
});

gameRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Game.findById(id, function (err, game){
      res.json(game);
  });
});

gameRoutes.route('/update/:id').post(function (req, res) {
    Game.findById(req.params.id, function(err, game) {
    if (!game)
      res.status(404).send("Dados não encontrados!");
    else {
      game.name = req.body.name;
      game.publisher = req.body.publiser;
      game.price = req.body.price;

        game.save().then(game => {
          res.json('Jogo Atualizado!');
        })
        .catch(err => {
          res.status(400).send("Habilite para atualizar no BD");
        });
    }
  });
});

gameRoutes.route('/delete/:id').get(function (req, res) {
    Game.findByIdAndRemove({_id: req.params.id}, function(err, game){
        if(err) res.json(err);
        else res.json('Jogo Removido!');
    });
});

module.exports = gameRoutes;
