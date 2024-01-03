const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'events';
const sqs = new AWS.SQS();
const sns = new AWS.SNS();

exports.handler = async (event) => {
    try {
        const { eventId, userEmail } = JSON.parse(event.body);
        const updateParams = {
            TableName: tableName,
            Key: { eventId },
            UpdateExpression: 'SET participants = list_append(if_not_exists(participants, :empty_list), :userEmail)',
            ExpressionAttributeValues: {
                ':userEmail': [userEmail],
                ':empty_list': [],
            },
            ReturnValues: 'ALL_NEW',
        };

        const result = await dynamoDB.update(updateParams).promise();
        console.log(result)
        const eventName=result.Attributes.eventName;
         const sqsParams = {
        MessageBody: JSON.stringify({ subject:`You have successfully registered for the event: ${eventName}`,email:userEmail,eventData:result.Attributes}),
        QueueUrl: 'arn of sqs queue',
    };

    await sqs.sendMessage(sqsParams).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User registered successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

