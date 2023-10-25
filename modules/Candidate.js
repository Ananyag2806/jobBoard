const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	workXP: {
		type: String,
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
	salaryXP: {
		type: Number,
		require: true,
	},
	phoneNo: {
		type: String,
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
	github: {
		type: String,
	},
});

module.exports = Candidate = mongoose.model('candidate', CandidateSchema);
