const mongoose = require("mongoose");

const PersonSchema = mongoose.Schema(
	{
		_id: {
			type: Number,
			required: [true, 'Input text']
		},
		name: {
		type: String,
		required: [true, 'Please add a text value']
		}
	},
	{
		timestamps:true
	}
)

module.exports = mongoose.model('People', PersonSchema)
