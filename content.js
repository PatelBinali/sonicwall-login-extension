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

      setTimeout(() => {
        loginBtn?.click();
        // Start monitoring for login completion
        monitorLoginCompletion();
      }, 500);
    } else {
      if (Date.now() - startTime < 5000) {
        setTimeout(tryFillLogin, 300);
      } else {
        alert("Login form not found.");
      }
    }
  }

  function monitorLoginCompletion() {
    // Check for successful login indicators
    const successIndicators = [
      // URL change to dashboard or main page
      () => !window.location.href.includes("/login"),
      // Presence of logout button or user menu
      () => document.querySelector(".logout, .user-menu, .sw-user-menu"),
      // Absence of login form
      () =>
        !document.querySelector(
          "input[type='password'], input[name='password']"
        ),
      // Presence of dashboard elements
      () => document.querySelector(".dashboard, .main-content, .sw-dashboard"),
    ];

    const checkInterval = setInterval(() => {
      const isLoggedIn = successIndicators.some((indicator) => {
        try {
          return indicator();
        } catch (e) {
          return false;
        }
      });

      if (isLoggedIn) {
        clearInterval(checkInterval);
        // Wait a moment for the page to fully load, then close the tab
        setTimeout(() => {
          chrome.runtime.sendMessage({ action: "loginComplete" });
        }, 1000);
      }
    }, 500);

    // Stop checking after 30 seconds to avoid infinite loop
    setTimeout(() => {
      clearInterval(checkInterval);
    }, 30000);
  }

  tryFillLogin();
});
