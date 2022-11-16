const sgMail = require('@sendgrid/mail')

const API_KEY =
    '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';

sgMail.setApiKey(API_KEY)

const message = {
    to: ['fr_estebanvl@hotmail.com', 'viteriesteban@gmail.com'],
    from:'viteriesteban@gmail.com',
    subject: 'Helllloooo',
    text: 'Hello,',
    html:'<h1> Hello from Sendgrid</h1>',
};

sgMail
    .send(message)
    .then((response) => console.log('Email Sent....'))
    .catch((error) => console.log(error.message));