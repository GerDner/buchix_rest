var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
relationship = require("mongoose-relationship");

var personSchema   = new Schema({
	name: String,
	lastname: String,
	mail: String,
	phone: String,
	handy: String,
	weeks:[{ type:Schema.ObjectId, ref:"person" }],
	type:[{ type:Schema.ObjectId, ref:"person" }]
});

module.exports = mongoose.model('person', personSchema);
