var Comment = require('../models/Comment')
var Promise = require('bluebird')

module.exports = {
	get: function(params){
		return new Promise(function(resolve,reject){
			Comment.find(params, function(err,comments){
				if(err){
					reject(err)
					return
				}
				var results = []

				comments.forEach(function(comment,i){
					results.push(comment.summary())
				})
				resolve(results)
			})
		})
	},

	post: function(body){
		return new Promise( function(resolve,reject){
			Comment.create( body, function(err,comments){
				if(err){
					reject(err)
					return
				}

				resolve(comment.summary())
			})
		})
	},
	getById: function(id){
		return new Promise( function(resolve, reject){
			Comment.findById( id, function(err,comments){
				if(err){
					reject(new Error('comment not found'))
					return
				}
				if( comments == null){
					reject(new Error('comment not found'))
					return
				}
				resolve(comment.summary())
			})
		})
	}
}