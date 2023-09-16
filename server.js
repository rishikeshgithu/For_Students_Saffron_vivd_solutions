const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static files (HTML, CSS, JavaScript)
app.use(express.static(__dirname + '/public'));

// Route to handle the form submission and send email
app.post('/checkout', (req, res) => {
  const { name, email, phone, projectName } = req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'YourEmailServiceProvider', // e.g., 'Gmail', 'Outlook', etc.
    auth: {
      user: 'your-email@gmail.com', // Your email address
      pass: 'your-email-password' // Your email password
    }
  });

  // Email message
  const mailOptions = {
    from: 'your-email@gmail.com', // Sender's email address
    to: email, // Recipient's email address (the user's email)
    subject: 'Confirmation of Your Project Order',
    html: `
      <h2>Order Confirmation</h2>
      <p>Thank you for placing an order with us. Here are your order details:</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Project Name:</strong> ${projectName}</p>
      <p>We will contact you soon to discuss the project further.</p>
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  
