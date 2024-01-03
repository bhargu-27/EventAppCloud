const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'events';

exports.handler = async (event) => {
    try {
        const scanParams = {
            TableName: tableName,
            ProjectionExpression: 'eventId, eventName, description, #time',
            ExpressionAttributeNames: {
                '#time': 'time',
            },
        };

        const result = await dynamoDB.scan(scanParams).promise();

        const events = result.Items.map(item => ({
            eventId: item.eventId,
            eventName: item.eventName,
            description: item.description,
            time: item.time,
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(events),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
