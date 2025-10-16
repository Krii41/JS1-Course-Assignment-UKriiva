
const signInBtn = document.getElementById("signInBtn");
const modal = document.getElementById("modal");        
const closeBtn = document.getElementById("btn-close");     
const loginForm = document.getElementById("login-form");    

 
  signInBtn.addEventListener("click", () => {
    modal.hidden = false;
  });

  closeBtn.addEventListener("click", () => {
    modal.hidden = true;
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = (document.getElementById("username").value || "").trim();
    if (!username) return;

    sessionStorage.setItem("username", username);
    window.location.href = "profile/index.html";
  });

  const profileNameEl = document.getElementById("profileName");
  if (profileNameEl) {
    const name = (sessionStorage.getItem("username") || "Guest").trim();
    profileNameEl.textContent = name || "Guest";
  }
