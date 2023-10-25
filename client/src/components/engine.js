const schedule = require('node-schedule');

const job = schedule.scheduleJob('* * * * *', function () {
	console.log('The answer to life, the universe, and everything!');
});

const task = schedule.scheduleJob('0 0 * * *', async function () {
	try {
		// Connect to MongoDB
		const client = await MongoClient.connect(
			'mongodb://localhost:27017/your-database',
			{ useUnifiedTopology: true }
		);
		const db = client.db('your-database');
		const collection = db.collection('your-collection');

		// Your batch search logic here
		let skip = 0;
		const batchSize = 50; // Adjust as needed

		while (true) {
			const batch = await collection
				.find({
					/* your query criteria */
				})
				.skip(skip)
				.limit(batchSize)
				.toArray();

			if (batch.length === 0) {
				break; // No more data to fetch
			}

			// Process the batch as needed

			skip += batchSize;
		}

		// Close the MongoDB connection
		client.close();
	} catch (error) {
		console.error('Error in the batch search:', error);
	}
});
