/**
 * Fur Baby Grooming Studio — Nodemailer / Express backend
 *
 * Setup:
 *   cd mailer-server
 *   npm install express nodemailer cors dotenv
 *   cp .env.example .env        ← fill in your Gmail credentials
 *   node server.js
 *
 * Gmail setup:
 *   1. Use a Gmail account dedicated to the business
 *   2. Enable 2-Step Verification on that account
 *   3. Generate an App Password: Google Account → Security → App Passwords
 *   4. Paste the 16-char app password into GMAIL_APP_PASSWORD in .env
 */

const express    = require('express');
const nodemailer = require('nodemailer');
const cors       = require('cors');
require('dotenv').config();

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://furbabiesgroom.com',
    'https://www.furbabiesgroom.com',
    process.env.FRONTEND_ORIGIN
  ].filter(Boolean)
}));

// ── Nodemailer transporter ──────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// ── Routes ──────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

app.post('/api/send-appointment', async (req, res) => {
  const {
    ownerName,
    ownerPhone,
    ownerEmail,
    petName,
    petBreed,
    serviceType,
    preferredDate,
    preferredTime,
    notes
  } = req.body;

  // Basic server-side validation
  if (!ownerName || !ownerPhone || !ownerEmail || !petName || !serviceType || !preferredDate || !preferredTime) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // ── Email to the business owner ────────────────────────────
  const businessMailOptions = {
    from: `"Fur Baby Booking" <${process.env.GMAIL_USER}>`,
    to: process.env.BUSINESS_EMAIL || process.env.GMAIL_USER,
    subject: `New Appointment Request — ${petName} (${ownerName})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1c1c2e;color:#f0ece8;border-radius:10px;overflow:hidden;">
        <div style="background:#c9796a;padding:24px 32px;">
          <h1 style="margin:0;font-size:1.4rem;color:#fff;">🐾 New Grooming Request</h1>
        </div>
        <div style="padding:28px 32px;">
          <h2 style="color:#e09484;margin-top:0;">Owner Information</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#9a97a8;width:140px;">Name</td><td style="padding:6px 0;">${ownerName}</td></tr>
            <tr><td style="padding:6px 0;color:#9a97a8;">Phone</td><td style="padding:6px 0;"><a href="tel:${ownerPhone}" style="color:#e09484;">${ownerPhone}</a></td></tr>
            <tr><td style="padding:6px 0;color:#9a97a8;">Email</td><td style="padding:6px 0;"><a href="mailto:${ownerEmail}" style="color:#e09484;">${ownerEmail}</a></td></tr>
          </table>

          <h2 style="color:#e09484;margin-top:24px;">Pet Information</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#9a97a8;width:140px;">Pet Name</td><td style="padding:6px 0;">${petName}</td></tr>
            <tr><td style="padding:6px 0;color:#9a97a8;">Breed</td><td style="padding:6px 0;">${petBreed || 'Not specified'}</td></tr>
          </table>

          <h2 style="color:#e09484;margin-top:24px;">Appointment Details</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;color:#9a97a8;width:140px;">Service</td><td style="padding:6px 0;">${serviceType}</td></tr>
            <tr><td style="padding:6px 0;color:#9a97a8;">Date</td><td style="padding:6px 0;">${formattedDate}</td></tr>
            <tr><td style="padding:6px 0;color:#9a97a8;">Time</td><td style="padding:6px 0;">${preferredTime}</td></tr>
            <tr><td style="padding:6px 0;color:#9a97a8;vertical-align:top;">Notes</td><td style="padding:6px 0;">${notes || 'None'}</td></tr>
          </table>
        </div>
        <div style="background:#252540;padding:16px 32px;font-size:0.8rem;color:#9a97a8;">
          Fur Baby Grooming Studio · 15150 Grand Blvd Unit #1, Monroe, MI 48161
        </div>
      </div>
    `
  };

  // ── Confirmation email to the customer ─────────────────────
  const customerMailOptions = {
    from: `"Fur Baby Grooming Studio" <${process.env.GMAIL_USER}>`,
    to: ownerEmail,
    subject: `We got your request, ${ownerName}! 🐾`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#1c1c2e;color:#f0ece8;border-radius:10px;overflow:hidden;">
        <div style="background:#c9796a;padding:24px 32px;">
          <h1 style="margin:0;font-size:1.4rem;color:#fff;">🐾 Appointment Request Received!</h1>
        </div>
        <div style="padding:28px 32px;">
          <p>Hi <strong>${ownerName}</strong>,</p>
          <p>Thank you for reaching out to Fur Baby Grooming Studio! We've received your appointment request for <strong>${petName}</strong> and we'll be in touch shortly to confirm your time.</p>

          <div style="background:#252540;border-radius:8px;padding:16px 20px;margin:20px 0;">
            <p style="margin:0 0 8px;color:#e09484;font-weight:bold;">Your Request Summary</p>
            <p style="margin:4px 0;color:#9a97a8;">Service: <span style="color:#f0ece8;">${serviceType}</span></p>
            <p style="margin:4px 0;color:#9a97a8;">Preferred Date: <span style="color:#f0ece8;">${formattedDate}</span></p>
            <p style="margin:4px 0;color:#9a97a8;">Preferred Time: <span style="color:#f0ece8;">${preferredTime}</span></p>
          </div>

          <p>If you need to reach us sooner, call or text:</p>
          <p style="font-size:1.4rem;font-weight:bold;"><a href="tel:7347314582" style="color:#e09484;text-decoration:none;">(734) 731-4582</a></p>

          <p style="color:#9a97a8;font-size:0.88rem;margin-top:24px;">
            📍 15150 Grand Blvd Unit #1, Monroe, MI 48161
          </p>
        </div>
        <div style="background:#252540;padding:16px 32px;font-size:0.8rem;color:#9a97a8;">
          Fur Baby Grooming Studio · Monroe, MI
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(businessMailOptions);
    await transporter.sendMail(customerMailOptions);
    return res.json({ success: true, message: 'Appointment request sent successfully.' });
  } catch (err) {
    console.error('Mail error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send email. Please try again.' });
  }
});

// ── Start server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Mailer server running at http://localhost:${PORT}`);
});
