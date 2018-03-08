let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const validate = require("validate.js");
exports.handler = function (event, context, callback) {
	//validating email and name
	var constraints = {
		email: {
			presence: true,
			email: true
		},
		name: {
			presence: true,
			length: {
				minimum: 1
			},
		}
	};

	let invalid = validate(event, constraints);

	if (!invalid) {
		let today = new Date().toLocaleDateString();
		ddb.put({
			TableName: 'contact_us',
			Item: {
				'name': event.name,
				'email': event.email,
				'phone': event.phone,
				'company': event.company,
				'comment': event.comment,
				'entryDate': today
			}
		}, function (err, data) {
			if (err) {
				callback(err, null);
			} else {
				callback(null, "Successfully Saved Entry!");
			}
		});
	} else {
		callback(JSON.stringify(invalid), null);
	}
}