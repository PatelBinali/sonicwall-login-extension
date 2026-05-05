const LOGIN_URL = "https://firewall.7span.work/sonicui/7/login/#/";
let currentLoginTabId = null;

function injectLoginOrPrompt(tabId) {
  currentLoginTabId = tabId; // Store the tab ID for later reference
  chrome.storage.local.get(["username", "password"], (data) => {
    if (!data.username || !data.password) {
      chrome.scripting.executeScript({
        target: { tabId },
        func: () => {
          const username = prompt("Enter your username:");
          const password = prompt("Enter your password:");
          if (username && password) {
            chrome.storage.local.set({ username, password }, () => {
              alert("Credentials saved. Reloading...");
              location.reload();
            });
          } else {
            alert("Username and password required.");
          }
        }
      });
    } else {
      chrome.scripting.executeScript({
        target: { tabId },
        files: ["content.js"]
      });
    }
  });
}

// Listen for login completion message from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "loginComplete" && currentLoginTabId) {
    // Close the login tab
    chrome.tabs.remove(currentLoginTabId, () => {
      currentLoginTabId = null; // Reset the stored tab ID
    });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get(["username", "password"], (data) => {
    chrome.tabs.query({}, (tabs) => {
      const existingTab = tabs.find(tab => tab.url && tab.url.startsWith(LOGIN_URL));

      if (existingTab) {
        chrome.tabs.update(existingTab.id, { active: true }, () => {
          injectLoginOrPrompt(existingTab.id);
        });
      } else {
        chrome.tabs.create({ url: LOGIN_URL }, (newTab) => {
          chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
            if (tabId === newTab.id && info.status === "complete") {
              chrome.tabs.onUpdated.removeListener(listener);
              injectLoginOrPrompt(tabId);
            }
          });
        });
      }
    });
  });
});

// Handle Chrome startup
chrome.runtime.onStartup.addListener(() => {
  chrome.tabs.query({}, (tabs) => {
    const loginTab = tabs.find(tab => tab.url && tab.url.startsWith(LOGIN_URL));

    if (loginTab) {
      chrome.tabs.update(loginTab.id, { active: true }, () => {
        injectLoginOrPrompt(loginTab.id);
      });
    } else {
      chrome.tabs.create({ url: LOGIN_URL }, (newTab) => {
        chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
          if (tabId === newTab.id && info.status === "complete") {
            chrome.tabs.onUpdated.removeListener(listener);
            injectLoginOrPrompt(tabId);
          }
        });
      });
    }
  });
});
