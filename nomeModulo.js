const express = require('express'),
    bodyParser = require('body-parser');
const nomeModulo = express.Router()

var uuid = require('uuid-v4'); //crea id univoci

const arraynomeModulo = [] //array di oggetti

//presentazione
nomeModulo.route('/')
  .get((req, res) => {
    res.status(200)
    res.json({message: 'Welcome to the API'})
  });

nomeModulo.route('/nomeModulo')
  //get di tutto l'array
    .get((req, res) => {
    res.status(200)
    res.json(arraynomeModulo)
  })
//posta un elemento
  .post((req, res) => {
    var nomeModulo = {}
    nomeModulo.id = uuid()
    if (req.body.attributo1) nomeModulo.attributo1 = req.body.attributo1
    if (req.body.attributo2) nomeModulo.attributo2 = req.body.attributo2
    if (req.body.attributo3) nomeModulo.attributo3 = req.body.attributo3
    arraynomeModulo.push(nomeModulo)
    res.status(200)
    res.json(nomeModulo)
  });
nomeModulo.route('/nomeModulo/:id')
  .put((req, res) => {
    var id = req.params.id
    const i = arraynomeModulo.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404) //elemento non trovato
    else {
        if (req.body.attributo1) arraynomeModulo[i].attributo1 = req.body.attributo1
        if (req.body.attributo2) arraynomeModulo[i].attributo2 = req.body.attributo2
        if (req.body.attributo3) arraynomeModulo[i].attributo3 = req.body.attributo3
        res.status(200)
        res.json(arraynomeModulo[i])
    }
  })
  .delete((req, res) => {
    var id = req.params.id
    const i = arraynomeModulo.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404) //elemento non trovato
    else {
        /*var cancellato = arraynomeModulo[i]*/
        arraynomeModulo.splice(i,1) //elimina l'elemento
        res.status(200)
        res.json({message: 'deleted'})
        /*res.json(cancellato})*/
    }
  })
//get one
  .get((req, res) => {
    var id = req.params.id
    const i = arraynomeModulo.findIndex(item => {return item.id === id})
    if (i==-1) res.sendStatus(404)
    else{
      res.status(200)
      res.json(arraynomeModulo[i])
    }
  });

module.exports = nomeModulo