var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DynamicForm = new Schema({
    formName: String,
    formTitle: String,
    submitUrl: String,
    formLayout: String,
    description: String,
    createdBy: String,
    createdDate: Date,
    updatedBy: String,
    updatedDate: Date
}, { strict: false });

module.exports = mongoose.model('DynamicForm', DynamicForm);
