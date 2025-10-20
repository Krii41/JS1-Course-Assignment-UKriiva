
/* const signInBtn = document.getElementById("signInBtn");
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

    localStorage.setItem("username", username);
    window.location.href = "profile/index.html";
  });

  const profileName = document.getElementById("profileName");
  if (profileName) {
    const name = (localStorage.getItem("username")).trim();
    profileName.textContent = name;
  }
*/


const productsContainer = document.querySelector("#products-container");
const API_URL = "https://v2.api.noroff.dev/rainy-days"; 


async function createProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const products = data.data;

        products.forEach(product => {
            const card = document.createElement("div");
            const image = document.createElement("img");
            const title = document.createElement("h3");
            const price = document.createElement("p");
            const anchor = document.createElement("a");

            card.className = "product-card";
            image.className = "pc-img";
            title.className = "pc-title";
            price.className = "pc-price";

            image.src = product.image.url;
            image.alt = product.image.alt;
            title.textContent = product.title;
            price.textContent = product.price;
            anchor.href = `product/index.html?id=${product.id}`;

            card.appendChild(image);
            card.appendChild(title);
            card.appendChild(price);
            anchor.appendChild(card);

            productsContainer.appendChild(anchor);

        })
    } catch (error) {
        console.error("Failed to create products", err); 
    }
}

createProducts();