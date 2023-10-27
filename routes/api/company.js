const express = require('express');
const router = express.Router();
const Company = require('../../modules/Company');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/company
//@desc     register company
//@access   public
router.post('/', auth, async (req, res) => {
	const {
		name,
		website,
		contacts,
		requirements,
		primarySkills,
		secondarySkills,
		yoe,
		salary,
		email,
		password,
	} = req.body;

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
			requirements,
			primarySkills,
			secondarySkills,
			yoe,
			salary,
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

//@route    POST api/company/job
//@desc     register company
//@access   public

module.exports = router;
