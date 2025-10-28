
export function getCart() {
    try {
        return JSON.parse(localStorage.getItem("cart")) || { items: [] };
    } catch {
        return { items: []};
    };
};

export function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge(cart);
};

export function updateCartBadge(cart = getCart()) {
    const badge = document.getElementById("cartCount");
    if (!badge) return;

    const count = (cart.items || []).reduce((n,i) => n + (Number(i.qty)||0), 0);

    if (count > 0) {
        badge.hidden = false;            
        badge.textContent = String(count);
      } else {
        badge.hidden = true;             
        badge.textContent = "0";      
      }
};

export function clearCart() {
    localStorage.removeItem("cart");
    updateCartBadge({ items: []});
};

export function addToCart(item) {
    const cart = getCart();
    const key = x => `${x.id}:${x.size ?? ""}`;
    const existing = cart.items.find(i => key(i) === key(item));

    if (existing) existing.qty += (item.qty || 1);
    else cart.items.push({...item, qty: item.qty || 1});

    saveCart(cart); 
    updateCartBadge();
};