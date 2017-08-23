var express = require('express')
var router = express.Router()
var Profile = require('../models/Profile')


router.post('/:resource', function(req,res,next){
	var resource = req.params.resource
	console.log(resource)
	if(resource === 'profile'){
		var formData = req.body
		console.log(formData)
		Profile.create(formData,function(err,profile){
			if(err){
				res.json({
					confirmation: 'fail',
					message: err
				})
				return
			}

			res.json({
				confirmation: 'success',
				results: profile
			})

		})
		return

	}
	res.json({
		confirmation: 'fail',
		message: 'resource not supported'
	})

})



router.get('/:resource', function(req,res,next){

	var resource = req.params.resource
	if(resource === 'profile'){
		Profile.find(null, function(err,profiles){
			if(err){
				res.json({
					confirmation: 'error'
				})
				return
			}
			res.json({
				confirmation: 'success',
				results: profiles
			})

		})
		return
	}
	res.json({
		confirmation: 'fail',
		message: 'resource not supported'
	})

})

router.get('/:resource/:id', function(req,res,next){
	var resource = req.params.resource
	var id = req.params.id

	if( resource == 'profile'){
		Profile.findById(id,function(err,profile){
			if(err){
				res.json({
					confirmation: 'fail',
					message: 'profile not found'
				})
				return

			}

			if(profile == null){
				res.json({
					confirmation: 'fail',
					result: profile
				})
			}
				res.json({
					confirmation: 'fail',
					result: profile
				})

		})
		return
	}
	res.json({
		confirmation: 'fail',
		message: 'resource not supported'
	})


})

module.exports = router
