const aws = require('aws-sdk');
const nodemailer = require('nodemailer');

// Initialize AWS SDK
const secretsManager = new aws.SecretsManager();

exports.handler = async (event) => {
    try {
        console.log(event)
        const {subject,email,eventData}=JSON.parse(event.Records[0].body);
        const secretName = 'event/email';
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        const secret = JSON.parse(data.SecretString);
        console.log(secret)
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: secret.email,
            pass: secret.password
          }
        });
        
        const mailOptions = {
            from: secret.email,
            to: email,
            subject: subject,
            text: `Here is the Event Details:\nEvent Name:${eventData.eventName}\nDescription:${eventData.description}\nContactEmail:${eventData.creatorEmail}\nEvent Time:${eventData.time}`,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info);

        return {
            statusCode: 200,
            body: JSON.stringify('Email sent successfully'),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error sending email'),
        };
    }
};

