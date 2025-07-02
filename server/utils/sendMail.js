import nodemailer from "nodemailer";

export const sendOtpEmail = async (toEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // Your Gmail address
      pass: process.env.MAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: `"MeetHub Verification" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: "Your MeetHub OTP - Verify your Email",
    html: `
      <div style="max-width: 600px; margin: auto; font-family: 'Segoe UI', sans-serif; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #5465FF; padding: 20px; text-align: center;">
          <img src="https://conteudo.meethub.com.br/wp-content/uploads/2022/11/logo-MM-SEM-FUNDO-_1_.webp" alt="MeetHub" style="max-width: 180px; margin-bottom: 10px;" />
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Verify your email</h1>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hi there 👋,</p>
          <p style="font-size: 16px; color: #555;">Thanks for signing up on <strong>MeetHub</strong>! Use the OTP below to verify your email address:</p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 32px; font-weight: bold; color: #5465FF;">${otp}</span>
          </div>
          <p style="font-size: 14px; color: #999;">This OTP will expire in 10 minutes. Please don't share it with anyone.</p>
          <hr style="margin: 30px 0;" />
          <p style="font-size: 12px; color: #aaa; text-align: center;">
            Need help? Contact us at <a href="mailto:support@meethub.gg" style="color: #5465FF;">support@meethub.gg</a>
          </p>
        </div>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
