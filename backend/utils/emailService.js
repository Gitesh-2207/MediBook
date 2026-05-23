import nodemailer from "nodemailer";

const getEnv = (key) => process.env[key]?.trim();

const emailHost = getEnv("EMAIL_HOST");
const emailPort = getEnv("EMAIL_PORT") ? Number(getEnv("EMAIL_PORT")) : 587;
const emailUser = getEnv("EMAIL_USER");
const emailPass = getEnv("EMAIL_PASS");
const emailFrom = getEnv("EMAIL_FROM") || emailUser;
const secure = getEnv("EMAIL_SECURE") === "true";

const transporter = nodemailer.createTransport({
    host: emailHost,
    port: emailPort,
    secure,
    auth: {
        user: emailUser,
        pass: emailPass,
    },
});

const sendAppointmentConfirmationEmail = async ({
    to,
    patientName,
    appointmentId,
    doctorName,
    slotDate,
    slotTime,
    amount,
}) => {
    if (!emailHost || !emailUser || !emailPass) {
        return {
            success: false,
            error: "Email service is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS in backend/.env.",
        };
    }

    if (!to) {
        return { success: false, error: "Recipient email is required." };
    }

    const mailOptions = {
        from: emailFrom,
        to,
        subject: "MediBook Appointment Payment Confirmation",
        html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Payment Confirmed</h2>
        <p>Hi ${patientName || "Patient"},</p>
        <p>Your payment for appointment ID <strong>${appointmentId}</strong> has been successfully confirmed.</p>
        <p><strong>Doctor:</strong> ${doctorName || "Doctor"}</p>
        <p><strong>Appointment Date:</strong> ${slotDate}</p>
        <p><strong>Appointment Time:</strong> ${slotTime}</p>
        <p><strong>Amount Paid:</strong> ₹${amount}</p>
        <p>Thank you for choosing MediBook. We look forward to seeing you.</p>
        <p>Best regards,<br/>MediBook Team</p>
      </div>
    `,
    };

    try {
        await transporter.verify();
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message || "Failed to send email." };
    }
};

export default sendAppointmentConfirmationEmail;
