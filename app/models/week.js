var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var weekSchema   = new Schema({
    kw: Number,
    year: Number,
    mo: String,
    di: String,
    mi: String,
    do: String,
    fr: String,
    sa: String,
    so: String,
    person: { type:Schema.ObjectId, ref:"person", childPath:"weeks" }
});

module.exports = mongoose.model('week', weekSchema);
