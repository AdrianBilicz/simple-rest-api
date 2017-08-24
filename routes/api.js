var express = require('express')
var router = express.Router()
var controllers = require('../controllers')


router.post('/:resource', function(req,res,next){
	var resource = req.params.resource

	var resource = req.params.resource
	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: `resource ${resource} not supported`
		})
	}

	var formData = req.body

	controllers.profile.post(formData)
	.then(function(result){
		res.json({
			confirmation: 'success',
			results: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err
		})
	})

})



router.get('/:resource', function(req,res,next){

	var resource = req.params.resource
	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: `resource ${resource} not supported`
		})
	}
	if(resource === 'profile'){
		controller
		.get(null)
		.then(function(results){
			res.json({
				confirmation: 'success',
				results: results
			})
		})
		.catch(function(err){
			res.json({
				confirmation: 'fail',
				message: err
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

	var controller = controllers[resource]
	if(controller == null){
		res.json({
			confirmation: 'fail',
			message: `resource ${resource} not supported`
		})
	}

	controller
	.getById(id)
	.then(function(result){
		res.json({
			confirmation: 'success',
			result: result
		})
	})
	.catch(function(err){
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})

})

module.exports = router
