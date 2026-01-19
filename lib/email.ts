import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App Password
  },
});

export const sendLowStockAlert = async (
  productName: string,
  variantName: string,
  remainingStock: number
) => {
  try {
    if (!process.env.EMAIL_USER) return; // Skip if no email configured

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `⚠️ Low Stock Alert: ${productName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #333;">
          <h2 style="color: #d9534f;">Stock Alert</h2>
          <p>The following item is running low or is out of stock:</p>
          <ul>
            <li><strong>Product:</strong> ${productName}</li>
            <li><strong>Variant:</strong> ${variantName}</li>
            <li><strong>Remaining Stock:</strong> ${remainingStock}</li>
          </ul>
          <p>Please restock via the admin dashboard.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`📧 Notification sent for ${productName}`);
  } catch (error) {
    console.error("Email Notification Error:", error);
  }
};
