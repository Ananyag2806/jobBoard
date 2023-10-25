const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	website: {
		type: String,
		require: true,
	},
	contacts: {
		type: Array,
		require: true,
	},
	requirements: {
		type: Array,
		require: true,
	},
	primarySkills: {
		type: Array,
		require: true,
	},
	secondarySkills: {
		type: Array,
		require: true,
	},
	yoe: {
		type: Number,
		require: true,
	},
	salary: {
		type: Number,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	linkedin: {
		type: String,
	},
});

module.exports = Company = mongoose.model('company', CompanySchema);
