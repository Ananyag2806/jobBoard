const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Candidate = require('../../modules/Candidate');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    GET api/auth
//@desc     Test route
//@access   public
router.get('/', auth, async (req, res) => {
	try {
		const candidate = await Candidate.findById(req.user.id).select(
			'-password'
		);
		res.json(candidate);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

//@route    POST api/auth
//@desc     Authorize user and get token- login
//@access   public
router.post('/', async (req, res) => {
	const { email, password } = req.body;

	try {
		let candidate = await Candidate.findOne({ email });

		if (!candidate) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Invalid credentials' }] });
		}

		const isMatch = password === candidate.password;

		if (!isMatch) {
			return res
				.status(400)
				.json({ errors: [{ msg: 'Invalid credentials' }] });
		}

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
