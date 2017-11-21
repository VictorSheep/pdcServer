const Prospect = require('./Prospect.model')

module.exports = {
	findAll : ( req, res ) => {
		Prospect
			.find({})
			.then( ppcts => {
				res.json(ppcts)
			})
			.catch(err => { // (normalement, il ne peut pas y avoir d'erreur ici, mais bon)
				res.json( {error: 1, message: err.message} )
			})
	},

	find : ( req, res ) => {
		Prospect
			.find( {_id: req.params.id} )
			.then( ppct => {
				res.json( ppct )
			})
			.catch( err => {
				res.json( {error: 1, message: err.message} )
			})
	},

	create : ( req, res ) => {
		const newProspect = new Prospect( req.body )
		console.log(req.body)
		newProspect
			.save()
			.then( ppct => res.json( {success: 1, message:'prospect add'} ) )
			.catch( err => res.json( {error: 1, message: err.message} ) )
	},

	update : ( req, res ) => {
		Prospect
			.findOne( {_id: req.params.id} )
			.then( ppct => {
				if( ppct === null ) {
					return Promise.reject('id du prospect inconnu')
				} else {
					ppct.email = req.body.email || ppct.email
					ppct.firstname = req.body.firstname || ppct.firstname
					ppct.lastname = req.body.lastname || ppct.lastname
					ppct.gender = req.body.gender || ppct.gender
					ppct.postcode = req.body.postcode || ppct.postcode
					ppct.city = req.body.city || ppct.city
					ppct.phone = req.body.phone || ppct.phone
					ppct.study_level = req.body.study_level || ppct.study_level
					ppct.asked_level = req.body.asked_level || ppct.asked_level
					ppct.current_level = req.body.current_level || ppct.current_level
				}
			})
			.then(() => res.json({success: 1, message:'prospect udated'}))
			.catch(err => res.json({error: 1, message: err.message}))
	},

	remove : ( req, res ) => {
		Prospect
			.findOneAndRemove( {_id: req.params.id} )
			.then( ppct => res.json( {success: 1, message:'prospect deleted'} ) )
			.catch( err => res.json( {error: 1, message: err.message} ) )
	}
}