const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'events';

exports.handler = async (event) => {
    try {
        console.log(event)
        const eventId  = event.queryStringParameters.eventId;
        console.log(typeof eventId)
        const getParams = {
            TableName: tableName,
            Key: { 
                eventId:eventId 
            },
        };

        const result = await dynamoDB.get(getParams).promise();

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Event not found' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
