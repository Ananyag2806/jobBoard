const express = require('express');
const dbCon = require('./connectDB.js');
const connectDB = require('./config/db');
// var cors = require('cors');

const app = express();

//connect database
connectDB();

//Init Middleware
app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => res.send('API running'));
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, x-auth-token'
// 	);
// 	res.header(
// 		'Access-Control-Allow-Methods',
// 		'DELETE, POST, GET, PUT, OPTIONS'
// 	);
// 	next();
// });

// ananya v2v38JvsowHVB7cd

app.use('/api/auth', require('./routes/api/auth.js'));
app.use('/api/candidate', require('./routes/api/candidate.js'));
app.use('/api/company', require('./routes/api/company.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
