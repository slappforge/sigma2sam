let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
exports.handler = function (event, context, callback) {
	let searchDate = event.queryStringParameters.date;
	let response = {
		body: "",
		statusCode: 200,
		isBase64Encoded: false
	}
	ddb.scan({
		TableName: 'contact_us',
		ExpressionAttributeValues: {
			':filterDate': searchDate
		},
		FilterExpression: 'entryDate = :filterDate'
	}, function (err, data) {
		if (err) {
			response.body = JSON.stringify(err);
			callback(response, null);
		} else {
			response.body = JSON.stringify(data);
			callback(null, response);
		}
	});
}