var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {
	get: function(params){
		return new Promise(function(resolve,reject){
			Profile.find(params, function(err,profiles){
				if(err){
					reject(err)
					return
				}
				var results = []
				profiles.forEach(function(profile,i){
					results.push(profile.summary())
				})
				resolve(results)
			})
		})
	},

	post: function(body){
		return new Promise( function(resolve,reject){
			if(body.password != null){
				var password = body.password
				var hashed = bcrypt.hashSync(password,10)
				body['password'] = hashed
			}
			Profile.create( body, function(err,profile){
				if(err){
					reject(err)
					return
				}

				resolve(profile.summary())
			})
		})
	},
	getById: function(id){
		return new Promise( function(resolve, reject){

			Profile.findById( id, function(err,profile){
				if(err){
					reject(new Error('Profile not found'))
					return
				}
				if( profile == null){
					reject(new Error('Profile not found'))
					return
				}
				resolve(profile.summary())
			})
		})
	}
}