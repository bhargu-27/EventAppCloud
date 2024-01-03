const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'events';

exports.handler = async (event) => {
    try {
        const { eventName, description, location, contactNumber, time, creatorEmail } = JSON.parse(event.body);;
        const eventId = uuidv4();
        const params = {
            TableName: tableName,
            Item: {
                eventId,
                eventName,
                description,
                location,
                contactNumber,
                time,
                creatorEmail,
            },
        };

        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Event created successfully', eventId }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};