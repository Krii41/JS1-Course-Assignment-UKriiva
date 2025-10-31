import { updateCartBadge } from "../js/shared/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();

  const el = document.getElementById("profileName");
  if (!el) return;

  const stored = localStorage.getItem("username");
  el.textContent = stored?.trim() || "Guest";
});
