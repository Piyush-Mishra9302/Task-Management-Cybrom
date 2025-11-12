const nodemailer = require('nodemailer');

const userMailsender = async (uname, uemail, upass) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        
            user : "piyushmishra1032001@gmail.com",
            pass : "lkge jzyt sxmr bhku"
      }
    });

    const mailOptions = {
      from: "piyushmishr32001@gmail.com",
      to: uemail,
      subject: "Sending Email by Admin using Node.js Task Management System",
      text: `Dear ${uname},\n\nYour Password: ${upass}\nYou can login with your email and this password.`
    };

    // ✅ wait for mail to finish sending
    await transporter.sendMail(mailOptions);

    console.log("Email successfully sent to:", uemail);
    return true; // ✅ explicitly return success
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // ✅ return failure (not crash)
  }
};

module.exports = { userMailsender };





