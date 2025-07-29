// Pre-fill fields if data already exists
chrome.storage.local.get(["username", "password"], (data) => {
  if (data.username) document.getElementById("username").value = data.username;
  if (data.password) document.getElementById("password").value = data.password;
});

document.getElementById("save").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  chrome.storage.local.set({ username, password }, () => {
    alert("Credentials saved!");
  });
});
