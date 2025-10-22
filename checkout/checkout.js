let cart = [];

function renderCart() {
    const cartLayout = document.querySelector(".cart-layout");

    if(!cartLayout) return console.error("No items here... yet or whatever");

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

        const inc = document.createElement("qbtn");
        inc.className = "qbtn";
        inc.setAttribute("aria-label", "Increase");
        inc.textContent = "+";

        const remove = document.createElement("button");
        remove.className = "remove";
        remove.setAttribute("aria-label", "Remove item");
        const removeIcon = document.createElement("img");
        removeIcon.src = "../assets/icons/remove.png";
        removeIcon.alt = "Remove item from cart";
        removeIcon.appendChild(remove);

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
    const shippingVal = shipCost(subtotalVal);
    const totalVal = subtotalVal + shippingVal;

    const row1 = row("Subtotal", "$" + Number(subtotalVal).toFixed(2));
    const row2 = row("Shipping", "$" + Number(shippingVal).toFixed(2));
    const hr = document.createElement("hr");
    const rowTotal = row("Total", "$" + Number(totalVal).toFixed(2));

    const checkout = document.createElement("a");
    checkout.href = "confirmation/index.html";
    checkout.className = "checkout";
    checkout.textContent = "Checkout";

    aside.append(subHeading, row1, row2, hr, rowTotal, checkout);

    cartLayout.append(cartItems, aside);


}