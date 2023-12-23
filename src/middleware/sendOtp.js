// smsSender.js

// This is a placeholder function. Implement the logic to send OTP via SMS using a service or library.
function sendOTPviaSMS(mobileNumber, otp) {
  // Replace this with the actual code to send OTP via SMS
  // For example, using Twilio:
  const accountSid = "your_twilio_account_sid";
  const authToken = "your_twilio_auth_token";
  const twilio = require("twilio");
  const client = new twilio(accountSid, authToken);

  client.messages
    .create({
      body: `Your OTP is ${otp}`,
      to: `+${mobileNumber}`, // Ensure the number is in the international format
      from: "your_twilio_phone_number",
    })
    .then((message) => console.log(message.sid))
    .catch((error) => console.error(error));
}

export default sendOTPviaSMS;
