const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendEmail = async ({
  to,
  subject,
  html,
}) => {

  try {

    await resend.emails.send({

      from: "Education Portal <onboarding@resend.dev>",

      to,

      subject,

      html,

    });

  } catch (error) {

    console.log(error);

    throw error;

  }

};

module.exports = {
  sendEmail,
};
