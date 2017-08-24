var express = require('express')
var router = express.Router()
var controllers =require('../controllers')
var bcrypt = require('bcryptjs')


router.post('/register', function(req,res,next){
	var formData = req.body

	controllers.profile
	.post(formData)
	.then(function(profile){
		res.redirect('/profile')
		return
	})
	.catch(function(err){
		next(err)
	})
})

router.get('/currentuser', function(req,res,next){
	if(req.session == null){
		res.json({
			confimation: 'success',
			user: null
		})
		return
	}
	if(req.session.user == null){
		res.json({
			confimation: 'success',
			user: null
		})
		return
	}
	res.json({
		confimation: 'succes',
		profile: req.session.user
	})
})


router.post('/login', function(req,res,next){
	var formData = req.body //email, pasword

	controllers.profile
	.get({email: formData.email},true)
	.then(function(profiles){
		
		if(profiles.length == 0){
			
			res.json({
				confimation: 'fail',
				profile: 'Profile not found'
			})
			return
		}
		var profile = profiles[0]
		var passwordCorrect = bcrypt.compareSync(formData.password,profile.password)
		if (passwordCorrect == false){
			req.session.reset
			res.json({
				confimation: 'fail',
				message: 'wrong pass'
			})
			return
		}
		req.session.user = profile._id.toString()
		res.redirect('/profile')

	})
	.catch(function(err){
		res.json({
			confimation: 'fail',
			profile: err
		})
	})
})


module.exports = router
