const express = require('express');
const router = express.Router();
const Candidate = require('../../modules/Candidate');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/candidate
//@desc     register candidate, no auth required
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

//@route    GET api/candidate/:id
//@desc     view details candidate
//@access   private
router.get('/:id', auth, async (req, res) => {
	try {
		const candidate = await Candidate.findById(req.params.id);

		if (!candidate) {
			return res.status(404).json({ msg: 'Candidate not found' });
		}
		// check if user is authorized
		if (req.user.id !== candidate._id.toString()) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		res.json(candidate);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error for GET candidate/:id');
	}
});

//@route    PUT api/candidate/:id
//@desc     update details candidate
//@access   private
router.put('/:id', auth, async (req, res) => {
	try {
		const candidate = await Candidate.findById(req.params.id);

		if (!candidate) {
			return res.status(404).json({ msg: 'Candidate not found' });
		}

		// check if user is authorized
		if (req.user.id !== candidate._id.toString()) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		// what to and how to update?
		const {
			workXP,
			primarySkills,
			secondarySkills,
			salaryXP,
			phoneNumber,
		} = req.body;

		candidate.workXP = workXP;
		candidate.primarySkills = primarySkills;
		candidate.secondarySkills = secondarySkills;
		candidate.salaryXP = salaryXP;
		candidate.phoneNumber = phoneNumber;

		await candidate.save();
		res.json({ msg: 'Candidate updated successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error for GET candidate/:id');
	}
});

module.exports = router;
