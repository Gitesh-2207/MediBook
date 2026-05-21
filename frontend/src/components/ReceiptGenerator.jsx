import jsPDF from "jspdf";
import QRCode from "qrcode";

export async function generateReceiptPDF(
    appointment,
    currencySymbol = "₹",
    userData = {},
    hospitalInfo = {}
) {
    try {
        if (!appointment) return;

        // =========================================
        // HOSPITAL INFO
        // =========================================
        const {
            name = "MediBook Hospital",
            address = "123 Health Street, Indore, Madhya Pradesh, India",
            emergency = "+91 9876543210",
            email = "support@medibook.com",
            logo = null,
        } = hospitalInfo;

        // =========================================
        // APPOINTMENT DATA
        // =========================================
        const bookingId =
            appointment._id ||
            appointment.id ||
            `BOOK-${Date.now()}`;

        const patientName =
            appointment.userData?.name ||
            userData?.name ||
            "Patient";

        const patientEmail =
            appointment.userData?.email ||
            userData?.email ||
            "N/A";

        const doctorName =
            appointment.docData?.name || "Doctor";

        const formattedDoctorName =
            doctorName.startsWith("Dr.")
                ? doctorName
                : `Dr. ${doctorName}`;

        const doctorSpeciality =
            appointment.docData?.speciality ||
            "General";

        const appointmentDate = appointment.slotDate
            ? appointment.slotDate.replace(/_/g, "/")
            : "N/A";

        const appointmentTime =
            appointment.slotTime || "N/A";

        const amount =
            appointment.amount || 0;

        const paymentStatus = appointment.payment
            ? "PAID"
            : "PENDING";

        const doctorAddress = appointment.docData?.address
            ? formatAddress(appointment.docData.address)
            : "Clinic address not available";

        // =========================================
        // PDF SETUP
        // =========================================
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4",
        });

        const pageWidth =
            doc.internal.pageSize.getWidth();

        const pageHeight =
            doc.internal.pageSize.getHeight();

        // =========================================
        // COLORS
        // =========================================
        const primary = [25, 118, 210];
        const dark = [40, 40, 40];
        const gray = [110, 110, 110];
        const border = [220, 220, 220];
        const lightBg = [247, 249, 252];

        // =========================================
        // HEADER
        // =========================================
        doc.setFillColor(...primary);

        doc.rect(0, 0, pageWidth, 115, "F");

        // LOGO
        if (logo) {
            try {
                const logoImage =
                    await loadImageAsDataURL(logo);

                doc.addImage(
                    logoImage,
                    "PNG",
                    30,
                    25,
                    60,
                    60
                );
            } catch (error) {
                console.log("Logo Error:", error);
            }
        }

        const leftStart = logo ? 105 : 35;

        doc.setTextColor(255, 255, 255);

        // Hospital Name
        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);

        doc.text(name, leftStart, 42);

        // Hospital Details
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(address, leftStart, 62);

        doc.text(
            `Emergency: ${emergency}`,
            leftStart,
            78
        );

        doc.text(
            `Email: ${email}`,
            leftStart,
            94
        );

        // Receipt Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);

        doc.text(
            "APPOINTMENT RECEIPT",
            pageWidth - 240,
            42
        );

        // Date & Time
        const now = new Date();

        const formattedDate =
            now.toLocaleDateString("en-GB");

        const formattedTime =
            now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(
            `Date: ${formattedDate} | ${formattedTime}`,
            pageWidth - 220,
            64
        );

        // =========================================
        // QR CODE
        // =========================================
        const qrData = `
Booking ID: ${bookingId}
Patient: ${patientName}
Doctor: ${formattedDoctorName}
Date: ${appointmentDate}
Time: ${appointmentTime}
Status: ${paymentStatus}
`;

        try {
            const qrImage =
                await QRCode.toDataURL(qrData, {
                    width: 120,
                    margin: 1,
                });

            // QR BOX
            doc.setFillColor(255, 255, 255);

            doc.setDrawColor(...border);

            doc.roundedRect(
                pageWidth - 165,
                135,
                115,
                130,
                8,
                8,
                "FD"
            );

            // QR IMAGE
            doc.addImage(
                qrImage,
                "PNG",
                pageWidth - 142,
                148,
                70,
                70
            );

            // QR TEXT
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            doc.setTextColor(...gray);

            doc.text(
                "Scan to Verify",
                pageWidth - 142,
                235
            );

            doc.text(
                "Appointment Details",
                pageWidth - 150,
                248
            );
        } catch (error) {
            console.log("QR Error:", error);
        }

        // =========================================
        // PATIENT INFORMATION BOX
        // =========================================
        let y = 135;

        doc.setFillColor(...lightBg);

        doc.roundedRect(
            30,
            y,
            pageWidth - 230,
            235,
            10,
            10,
            "F"
        );

        // SECTION TITLE
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);

        doc.setTextColor(...dark);

        doc.text(
            "Patient Information",
            45,
            y + 30
        );

        // Divider
        doc.setDrawColor(...border);

        doc.line(
            45,
            y + 42,
            pageWidth - 245,
            y + 42
        );

        // DETAILS
        const details = [
            ["Patient Name", patientName],
            ["Patient Email", patientEmail],
            ["Booking ID", bookingId],
            ["Doctor", formattedDoctorName],
            ["Specialization", doctorSpeciality],
            ["Appointment Date", appointmentDate],
            ["Appointment Time", appointmentTime],
            [
                "Consultation Fee",
                `${currencySymbol}${amount}`,
            ],
            ["Payment Status", paymentStatus],
        ];

        let rowY = y + 70;

        details.forEach(([label, value]) => {
            // LABEL
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);

            doc.setTextColor(...dark);

            doc.text(`${label}:`, 50, rowY);

            // VALUE
            doc.setFont("helvetica", "normal");

            doc.text(
                String(value),
                180,
                rowY
            );

            rowY += 22;
        });

        // =========================================
        // CLINIC ADDRESS
        // =========================================
        y += 285;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.setTextColor(...dark);

        doc.text("Clinic Address", 30, y);

        // Divider
        doc.line(
            30,
            y + 10,
            pageWidth - 30,
            y + 10
        );

        // Address Text
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);

        doc.setTextColor(...gray);

        const addressLines =
            doc.splitTextToSize(
                doctorAddress,
                pageWidth - 60
            );

        doc.text(addressLines, 30, y + 35);

        // =========================================
        // TERMS & CONDITIONS
        // =========================================
        y += 95;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);

        doc.setTextColor(...dark);

        doc.text(
            "Terms & Conditions",
            30,
            y
        );

        // Divider
        doc.line(
            30,
            y + 10,
            pageWidth - 30,
            y + 10
        );

        const terms = `
• Please arrive at least 10 minutes before your appointment.
• Carry a valid ID proof during your hospital visit.
• Consultation fee is non-refundable after confirmation.
• Contact hospital support for rescheduling or cancellation.
`;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.setTextColor(...gray);

        const termsLines =
            doc.splitTextToSize(
                terms,
                pageWidth - 60
            );

        doc.text(termsLines, 30, y + 30);

        // =========================================
        // FOOTER
        // =========================================
        doc.setFillColor(...primary);

        doc.rect(
            0,
            pageHeight - 55,
            pageWidth,
            55,
            "F"
        );

        doc.setTextColor(255, 255, 255);

        // Footer Title
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);

        doc.text(
            "Thank you for choosing MediBook Hospital",
            30,
            pageHeight - 32
        );

        // Footer Bottom
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        doc.text(
            "This receipt is digitally generated and does not require a signature.",
            30,
            pageHeight - 16
        );

        // Emergency Contact
        doc.text(
            `Emergency: ${emergency}`,
            pageWidth - 185,
            pageHeight - 16
        );

        // =========================================
        // DOWNLOAD PDF
        // =========================================
        doc.save(
            `appointment_receipt_${patientName}.pdf`
        );
    } catch (error) {
        console.error(
            "Receipt Generation Failed:",
            error
        );
    }
}

// =========================================
// LOAD IMAGE
// =========================================
async function loadImageAsDataURL(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas =
                document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            const ctx =
                canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            resolve(
                canvas.toDataURL("image/png")
            );
        };

        img.onerror = reject;

        img.src = url;
    });
}

// =========================================
// FORMAT ADDRESS
// =========================================
function formatAddress(address) {
    if (!address) return "-";

    const parts = [];

    if (address.line1)
        parts.push(address.line1);

    if (address.line2)
        parts.push(address.line2);

    if (address.city)
        parts.push(address.city);

    if (address.state)
        parts.push(address.state);

    if (address.zip)
        parts.push(address.zip);

    if (address.country)
        parts.push(address.country);

    return parts.join(", ");
}