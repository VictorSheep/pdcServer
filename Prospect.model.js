const mongoose = require('mongoose')

mongoose.Promise = global.Promise

const prospectSchema = new mongoose.Schema(
	{
	  email : 				{ type: String, required: true },
	  firstname : 		{ type: String, required: true },
	  lastname : 			{ type: String, required: true },
		gender : 				{ type: String, required: true },
		adress : 				{ type: String, required: true },
	  postcode : 			{ type: Number, required: true },
	  city: 					{ type: String, required: true },
	  phone: 					{ type: String, required: true },
	  study_level: 		{ type: String, required: true },
	  asked_class: 		{ type: String, required: true },
	  current_class: 	{ type: String, required: true }
	},
	{ collection: 'prospects' }
)

// Fabricatioin d'un "Modèle" à partir de ce schéma de données
// Un modèle mongoose contient les méthodes permétant d'aller chercher/modifier/supprimer
// dans la base
const prospectModel = mongoose.model('Prospect', prospectSchema)

module.exports = prospectModel