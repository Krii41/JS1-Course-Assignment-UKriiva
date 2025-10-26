function getCart() {
    try {
        return JSON.parse(localStorage.getItem("cart")) || { items: []};
    } catch {
        return { items: []};
    }
}

let cart = getCart().items;



function renderCart() {
    const cartLayout = document.querySelector(".cart-layout");

    if(!cartLayout) return;

    cartLayout.replaceChildren();

    if(!cart.length) {
        const emptyCart = document.createElement("p");
        emptyCart.className = "cart-empty";
        emptyCart.textContent = "No products here yet";
        cartLayout.appendChild(emptyCart);
        return;
    }

    const cartItems = document.createElement("section");
    cartItems.className = "cart-items";

    const list = document.createElement("div");
    list.className = "purchased-list";

    cart.forEach(product => {
        const row = document.createElement("article");
        row.className = "cart-row";
        row.dataset.id = product.id;

        const img = document.createElement("img");
        img.className = "thumb";
        img.src = product.image;
        img.alt = product.image.alt;

        const title = document.createElement("h2");
        title.className = "title";
        title.textContent = product.title;

        const qtyBox = document.createElement("div");
        qtyBox.className = "qty";

        const dec = document.createElement("button");
        dec.className = "qbtn";
        dec.setAttribute("aria-label", "Decrease");
        dec.textContent = "-";

        const qinput = document.createElement("input");
        qinput.className = "qinput";
        qinput.type = "number";
        qinput.min = "1";
        qinput.inputMode = "numeric";
        qinput.value = String(product.qty);

        const inc = document.createElement("button");
        inc.className = "qbtn";
        inc.setAttribute("aria-label", "Increase");
        inc.textContent = "+";

        const remove = document.createElement("button");
        remove.className = "remove";
        remove.setAttribute("aria-label", "Remove item");
        remove.dataset.id = product.id;

        dec.dataset.id   = product.id;
        qinput.dataset.id = product.id;
        inc.dataset.id   = product.id;
        remove.dataset.id = product.id;

        const removeIcon = document.createElement("img");
        removeIcon.src = "../assets/icons/remove.png";
        removeIcon.alt = "Remove item from cart";
        remove.appendChild(removeIcon);

        qtyBox.append(dec, qinput, inc, remove);

        const line = document.createElement("div");
        line.className = "line-total";
        line.textContent = "$" + (product.price * product.qty).toFixed(2);

        row.append(img, title, qtyBox, line);
        list.appendChild(row);

    });

    cartItems.appendChild(list);

    const aside = document.createElement("aside");
    aside.className = "summary";

    const subHeading = document.createElement("h3");
    subHeading.textContent = "Order summary";

    const subtotalVal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shippingVal = 30;
    const totalVal = subtotalVal + shippingVal;

    const row1 = row("Subtotal", "$" + Number(subtotalVal).toFixed(2));
    const row2 = row("Shipping", "$" + Number(shippingVal).toFixed(2));
    const hr = document.createElement("hr");
    const rowTotal = row("Total", "$" + Number(totalVal).toFixed(2), true);

    const checkout = document.createElement("a");
    checkout.href = "confirmation/index.html";
    checkout.className = "checkout";
    checkout.textContent = "Checkout";

    aside.append(subHeading, row1, row2, hr, rowTotal, checkout);

    cartLayout.append(cartItems, aside);

    list.addEventListener("click", (e) => {
        const t = e.target;

        if(t.classList.contains("remove") || t.parentElement?.classList.contains("remove")) {
            const id = t.dataset.id || t.parentElement?.dataset.id;
            cart = cart.filter(i => i.id !== id);

            const data = { items: cart};
            if (cart.length === 0 ) {
                localStorage.removeItem("cart");
            } else {
                localStorage.setItem("cart", JSON.stringify(data));
            }
            renderCart();
        }

        if (t.classList.contains("qbtn")) {
            const id = t.dataset.id;
            const item = cart.find(i => i.id === id);
            if(!item) return;
            const plus = t.textContent.trim() === "+";
            item.qty = Math.max(1, (item.qty || 1) + (plus ? 1 : -1));
            renderCart();
        }
    });

    list.addEventListener("input", (e) => {
        const t = e.target;
        if (!t.classList.contains("qinput")) return;
        const id = t.dataset.id;
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty = Math.max(1, Number(t.value || 1));
        renderCart();
    });

    function row(label, value, isTotal=false) {
        const r = document.createElement("div");
        r.className = "row" + (isTotal ? " total" : "");
        const l = document.createElement("span");
        l.textContent = label;
        const v = document.createElement("span");
        v.className = "val";
        v.textContent = value;
        r.append(l, v);
        return r;
  }
};

renderCart();