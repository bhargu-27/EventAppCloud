const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');
const sns = new AWS.SNS();

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'users';

exports.handler = async (event) => {
    try {
        const { emailId, password, city, gender, phone } = JSON.parse(event.body);
        const hashedPassword = await bcrypt.hash(password, 8);

        // Store user data in DynamoDB
        const params = {
            TableName: tableName,
            Item: {
                emailId,
                password: hashedPassword,
                city,
                gender,
                phone,
            },
        };

        await dynamoDB.put(params).promise();
        await sns.subscribe({
            Protocol: 'email',
            TopicArn: 'arn of sns topic',
            Endpoint: emailId
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User data stored successfully' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
