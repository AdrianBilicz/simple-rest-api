var mongoose = require ('mongoose')

var ProfileSchema = new mongoose.Schema({
	email: {type:String, default:''},
	username: {type:String, default:''},
	password: {type:String, default:''},
	timeStamp: {type:Date, default: Date.now}
})


ProfileSchema.methods.summary = function(){
	var summary = {
		email: this.email,
		username: this.username,
		timestamp: this.timeStamp,
		id: this._id.toString()
	}
	return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)