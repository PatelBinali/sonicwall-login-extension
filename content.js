chrome.storage.local.get(["username", "password"], ({ username, password }) => {
  if (!username || !password) {
    alert("No credentials found.");
    return;
  }

  const startTime = Date.now();

  function tryFillLogin() {
    const userField = document.querySelector("input[type='text'], input[name='username']");
    const passField = document.querySelector("input[type='password'], input[name='password']");
    const loginBtn = document.querySelector(".sw-login__trigger");

    if (userField && passField) {
      userField.focus();
      userField.value = username;
      userField.dispatchEvent(new Event("input", { bubbles: true }));

      passField.focus();
      passField.value = password;
      passField.dispatchEvent(new Event("input", { bubbles: true }));

      setTimeout(() => loginBtn?.click(), 500);
    } else {
      if (Date.now() - startTime < 5000) {
        setTimeout(tryFillLogin, 300);
      } else {
        alert("Login form not found.");
      }
    }
  }

  tryFillLogin();
});
