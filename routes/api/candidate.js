const express = require('express');
const router = express.Router();
const Candidate = require('../../modules/Candidate');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/candidate
//@desc     register candidate
//@access   public
router.post('/', async (req, res) => {
	const {
		name,
		workXP,
		primarySkills,
		secondarySkills,
		salaryXP,
		phoneNumber,
		email,
		password,
	} = req.body;

	try {
		let candidate = await Candidate.findOne({ email });

		if (candidate) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'User already defined' }] });
		}

		candidate = new Candidate({
			name,
			workXP,
			primarySkills,
			secondarySkills,
			salaryXP,
			phoneNumber,
			email,
			password,
		});

		await candidate.save();

		const payload = {
			candidate: {
				id: candidate.id,
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

module.exports = router;
