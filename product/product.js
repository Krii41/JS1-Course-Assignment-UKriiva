const productContainer = document.querySelector("#product-container");
const API_URL = "https://v2.api.noroff.dev/rainy-days"; 

async function createProduct() {
    try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");

        if(!id) {
            productContainer.textContent = "No product ID provided";
            return;
        }

        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        const product = data.data;

        const article = document.createElement("article");
        const imageDiv = document.createElement("div");
        const image = document.createElement("img");
        const info = document.createElement("div");
        const title = document.createElement("h1");
        const price = document.createElement("h2");
        const form = document.createElement("form");
        const fieldset = document.createElement("fieldset");
        const legend = document.createElement("legend");
        const grid = document.createElement("div");
        const desc = document.createElement("p");
        const btn = document.createElement("button");

        article.className = "product-detail";
        imageDiv.className = "product-img";
        image.src = product.image.url;
        image.alt = product.image.alt;
        info.className = "product-info";
        title.textContent = product.title;
        price.textContent = `$ ${product.price}`;
        form.className = "size-picker";
        form.action = "#";
        fieldset.className = "sizes";
        legend.textContent = "Select size";
        grid.className = "size-grid";

        const sizes = ['XS','S','M','L','XL','XXL'];
        sizes.forEach((s, i) => {
            const input = document.createElement('input');
            input.type = "radio";
            input.name = "size";
            input.id = `size-${s.toLowerCase()}`;
            input.value = s;

            if (i === 0) input.required = true;

            const label = document.createElement("label");
            label.className = "size-option";
            label.setAttribute('for', input.id);
            label.textContent = s;

            grid.append(input, label);
        });

        desc.className = "description";
        desc.textContent = product.description;
        btn.className = "cta-btn";
        btn.type = "button";
        btn.textContent = "Add to Cart";

        imageDiv.appendChild(image);
        fieldset.append(legend, grid);
        form.appendChild(fieldset);
        info.append(title, price, form, desc, btn);
        article.append(imageDiv, info);

        productContainer.appendChild(article)


    } catch(error) {
        console.error("Failed to create product");
    }
}

createProduct();