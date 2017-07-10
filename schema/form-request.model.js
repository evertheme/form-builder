var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FormRequest = new Schema({
    requestId: String
}, { strict: false });

module.exports = mongoose.model('FormRequest', FormRequest);
