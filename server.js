require('colors')

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 8020

// Création d'une application ExpressJS
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// middleware qui permet d'autoriser les requête Ajax provenant d'un autre domaine
app.use( (req, res, next) => {
	// le serveur accepte les requête ajax qui proviennent de tous les domaines
	res.header('Access-Control-Allow-Origin', '*')
	// autorise les type de requête get put post et delete
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	// autorise le Content-Type pour la réponse
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

// Récupère le controlleur 'prospect' du fichier 'Prospect.controller'
const prospect = require('./Prospect.controller')
// Créé la requete get sur l'URL '/prospect'
// En faisant cette requete: la fonction executé est prospect.findAll
app.get 		('/prospect', 				prospect.findAll)
// Créé la requete get sur l'URL '/prospect/:id'
// En faisant cette requete: la fonction executé est prospect.find
app.get 		('/prospect/:id', 		prospect.find)
// Créé la requete get sur l'URL '/prospect'
// En faisant cette requete: la fonction executé est prospect.create
app.post 		('/prospect', 				prospect.create)
// Créé la requete get sur l'URL '/prospect/:id'
// En faisant cette requete: la fonction executé est prospect.update
app.put 		('/prospect/:id', 		prospect.update)
// Créé la requete get sur l'URL '/prospect/:id'
// En faisant cette requete: la fonction executé est prospect.remove
app.delete 	('/prospect/:id', 		prospect.remove)

// Indique à mongoose que les promesse à utiliser
// sont celles par défaut dans Node.js (objet global)
mongoose.Promise = global.Promise

// Connexion à la base de données MONGO
// 'mongodb://localhost:27017/intranet' qu'est-ce que c'est ?
// 		Quand on se connecte à la bdd mongoose en lançant `mongo`
// 		dans la console, il est indiqué `connecting to: mongodb://127.0.0.1:27017`
// 		127.0.0.1 = localhost
// 		27017 = port utilisé (arbitrairement) par mongo
// 		intranet = nom de la bdd (`use intranet` dans mongo)
mongoose.connect('mongodb://localhost:27017/intranet', { useMongoClient: true })
	// Une fois connecté ( .then( successCallback(), errorCallback() ) )
	.then(
		() => console.log(' MongoDB '.bgGreen, 'Connection établie !'.green),
		() => console.log(' MongoDB error '.bgRed, 'Auriez vous oublié de lancer `mongod` ?'.red)
	)
	// S'il y a eu une erreur sur le .connect() on lance le catch
	.catch(err => console.log('err::'.red, err))
	// Une fois le then ou le catch executé .then( successFuction() )
	.then(
		() => {
			// App écoute le port 8080, puis on execute une fonction de call back
			app.listen(
				port,
				() => console.log(' App Started '.bgGreen.black, `Le serveur http://localhost:${port} est prêt !`.green))
		}
	)