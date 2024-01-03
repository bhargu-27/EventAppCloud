const AWS = require('aws-sdk');
const bcrypt = require('bcryptjs');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'users';

exports.handler = async (event) => {
    try {
        console.log(event)
        const { emailId, password } = JSON.parse(event.body);

        // Retrieve user data from DynamoDB based on email
        const getUserParams = {
            TableName: tableName,
            Key:  {
                emailId:emailId
            } ,
        };

        const userData = await dynamoDB.get(getUserParams).promise();

        if (!userData.Item) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid credentials' }),
            };
        }

        // Compare the entered password with the stored hashed password
        const isValidPassword = await bcrypt.compare(password, userData.Item.password);

        if (!isValidPassword) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid credentials' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Login successful' }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

