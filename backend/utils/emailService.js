import nodemailer from "nodemailer";

const getEnv = (key) => process.env[key]?.trim();

const getEmailConfig = () => {
    const host = getEnv("EMAIL_HOST");
    const port = getEnv("EMAIL_PORT") ? Number(getEnv("EMAIL_PORT")) : 587;
    const user = getEnv("EMAIL_USER");
    const pass = getEnv("EMAIL_PASS");

    return {
        host,
        port,
        user,
        pass,
        from: getEnv("EMAIL_FROM") || user,
        secure: getEnv("EMAIL_SECURE") === "true",
    };
};

const createTransporter = ({ host, port, secure, user, pass }) =>
    nodemailer.createTransport({
        host,
        port,
        secure,
        family: 4,
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        auth: {
            user,
            pass,
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
    const emailConfig = getEmailConfig();

    if (!emailConfig.host || !emailConfig.user || !emailConfig.pass) {
        return {
            success: false,
            error:
                "Email service is not configured. Set EMAIL_HOST, EMAIL_PORT, EMAIL_USER, and EMAIL_PASS in backend/.env.",
        };
    }

    if (!to) {
        return { success: false, error: "Recipient email is required." };
    }

    const mailOptions = {
        from: emailConfig.from,
        to,
        subject: "Payment Confirmed - MediBook Appointment",
        html: `
      <div style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
        <div style="max-width:640px; margin:0 auto; padding:28px 16px;">
          <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:12px; overflow:hidden;">
            <div style="background:#2563eb; padding:22px 28px; color:#ffffff;">
              <h1 style="margin:0; font-size:22px; line-height:1.3;">Payment Confirmed</h1>
              <p style="margin:6px 0 0; font-size:14px; opacity:0.95;">Your MediBook appointment payment was successful.</p>
            </div>

            <div style="padding:28px;">
              <p style="margin:0 0 16px; font-size:15px;">Hello ${patientName || "Patient"},</p>
              <p style="margin:0 0 22px; font-size:15px; line-height:1.6;">
                Thank you for completing your payment. Your appointment has been confirmed with the details below.
              </p>

              <div style="border:1px solid #e5e7eb; border-radius:10px; overflow:hidden; margin-bottom:22px;">
                <table style="width:100%; border-collapse:collapse; font-size:14px;">
                  <tr>
                    <td style="padding:12px 16px; background:#f9fafb; color:#6b7280; width:42%;">Appointment ID</td>
                    <td style="padding:12px 16px; font-weight:600;">${appointmentId}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px; background:#f9fafb; color:#6b7280;">Doctor</td>
                    <td style="padding:12px 16px; font-weight:600;">${doctorName || "Doctor"}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px; background:#f9fafb; color:#6b7280;">Date</td>
                    <td style="padding:12px 16px;">${slotDate}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px; background:#f9fafb; color:#6b7280;">Time</td>
                    <td style="padding:12px 16px;">${slotTime}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px; background:#f9fafb; color:#6b7280;">Amount Paid</td>
                    <td style="padding:12px 16px; font-weight:700; color:#16a34a;">Rs. ${amount}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 16px; background:#f9fafb; color:#6b7280;">Payment Status</td>
                    <td style="padding:12px 16px;"><span style="display:inline-block; padding:4px 10px; border-radius:999px; background:#dcfce7; color:#166534; font-weight:700; font-size:12px;">Paid</span></td>
                  </tr>
                </table>
              </div>

              <p style="margin:0 0 10px; font-size:14px; line-height:1.6;">
                Please arrive a few minutes before your scheduled time and keep this confirmation for your records. <br> Thank you for choosing MediBook!.
              </p>
              <p style="margin:18px 0 0; font-size:14px; line-height:1.6;">
                Best regards,<br/>
                <strong>MediBook Team</strong>
              </p>
            </div>
          </div>

          <p style="margin:16px 0 0; text-align:center; color:#6b7280; font-size:12px;">
            This is an automated confirmation email from MediBook.
          </p>
        </div>
      </div>
    `,
    };

    try {
        const transporter = createTransporter(emailConfig);
        const info = await transporter.sendMail(mailOptions);
        return {
            success: true,
            accepted: info.accepted || [],
            rejected: info.rejected || [],
            messageId: info.messageId,
            response: info.response,
        };
    } catch (error) {
        return { success: false, error: error.message || "Failed to send email." };
    }
};

export default sendAppointmentConfirmationEmail;
