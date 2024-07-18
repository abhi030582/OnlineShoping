const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-email', async (req, res) => 
{
  const { to, subject, text } = req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure:false,
    service: 'gmail',
    auth: {
      user: 'abhishekjee@gmail.com',
      pass: 'wfzf sjfa eayp yyjk'
    }
  });
  const mailOptions = {
    from: 'abhishekjee@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

 const into =await transporter.sendMail(mailOptions, (error, info) => 
  {
    if (error) {
      console.log(error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

module.exports = router;
