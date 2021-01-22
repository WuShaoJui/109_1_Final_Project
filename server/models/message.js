const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const LocationSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Name field is required.']
	},
	body: {
		type: String,
		required: [true, 'Body field is required.']
	},
	lat: {
		type: String,
		required: [true, 'Loc field is required.']
	}, 
	lng:{
		type: String,
		required: [true, 'Loc field is required.']
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', LocationSchema)

// Exporting table for querying and mutating
module.exports = Message
