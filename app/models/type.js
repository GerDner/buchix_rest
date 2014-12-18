var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var typeSchema   = new Schema({
    value: String,
    person: [{ type:Schema.ObjectId, ref:"person" }]
});

module.exports = mongoose.model('type', typeSchema);
