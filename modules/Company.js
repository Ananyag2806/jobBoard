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
