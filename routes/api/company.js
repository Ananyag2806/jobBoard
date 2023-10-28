const express = require('express');
const router = express.Router();
const Company = require('../../modules/Company');
const auth = require('../../middleware/auth');
const JobPost = require('../../modules/JobPost');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/company
//@desc     register company
//@access   public
router.post('/', async (req, res) => {
	const { name, website, contacts, email, password } = req.body;

	try {
		let company = await Company.findOne({ email });

		if (company) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Company profile already created' }] });
		}

		company = new Company({
			name,
			website,
			contacts,
			email,
			password,
		});

		await company.save();

		const payload = {
			company: {
				id: company.id,
			},
		};

		jwt.sign(
			payload,
			config.get('jwtSecret'),
			{ expiresIn: 360000 },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    GET api/company
//@desc     view company dets
//@access   private
router.get('/:id', auth, async (req, res) => {
	try {
		const company = await Company.findById(req.params.id);
		console.log(req);
		if (!company) {
			return res.status(404).json({ msg: 'Company not found' });
		}

		res.json(company);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error for GET api/company');
	}
});

//@route    PUT api/company
//@desc     update company dets by company id
//@access   private
router.put('/:id/updateCompany', auth, async (req, res) => {
	try {
		const company = await Company.findById(req.params.id);

		if (!company) {
			return res
				.status(404)
				.json({ errors: [{ msg: 'Company not found' }] });
		}

		const { name, website, contacts } = req.body;

		company.name = name;
		company.website = website;
		company.contacts = contacts;

		await company.save();

		res.json(company);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    POST api/company/job
//@desc     post a job opening
//@access   private
router.post('/:id/job', auth, async (req, res) => {
	try {
		// Get the company associated with the authenticated user
		const company = await Company.findById(req.params.id);
		console.log(req.params);

		if (!company) {
			return res
				.status(404)
				.json({ errors: [{ msg: 'Company not found' }] });
		}

		// Create a new job posting based on the request body
		const jobPost = new JobPost({
			title: req.body.title,
			requirements: req.body.requirements,
			primarySkills: req.body.primarySkills,
			secondarySkills: req.body.secondarySkills,
			yoe: req.body.yoe,
			salary: req.body.salary,
			companyName: req.params.id,
		});

		// Save the updated company information with the new job posting
		await jobPost.save();

		res.json(jobPost);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    PUT api/company/job/:id
//@desc     update a job opening by job id
//@access   public
router.put('/:id/updateJob', auth, async (req, res) => {
	try {
		const job = await JobPost.findById(req.params.id);

		if (!job) {
			return res
				.status(404)
				.json({ errors: [{ msg: 'No job posts found' }] });
		}

		const {
			title,
			requirements,
			primarySkills,
			secondarySkills,
			yoe,
			salary,
			companyName,
		} = req.body;

		job.title = title;
		job.requirements = requirements;
		job.primarySkills = primarySkills;
		job.secondarySkills = secondarySkills;
		job.yoe = yoe;
		job.salary = salary;
		job.companyName = companyName;

		await job.save();

		res.json(job);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    GET api/company/allJob/
//@desc     view all jobs posted by company using company id
//@access   private
router.get('/:id/allJob', auth, async (req, res) => {
	try {
		const jobs = await JobPost.find({ companyName: req.params.id });
		if (!jobs) {
			return res.status(404).json({ msg: 'No posts found' });
		}

		console.log(jobs);
		res.json(jobs);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error for GET api/company/allJob');
	}
});

module.exports = router;
