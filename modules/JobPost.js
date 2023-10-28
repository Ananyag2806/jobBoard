const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobPostSchema = new mongoose.Schema({
	title: {
		type: String,
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
	companyName: {
		type: Schema.Types.ObjectId,
		ref: 'company',
	},
});

module.exports = JobPost = mongoose.model('jobPost', JobPostSchema);
