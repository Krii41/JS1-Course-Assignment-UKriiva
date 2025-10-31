# JS1 Course Assignment

## Rainy Days

An online shop for men’s and women’s rain jackets, built with HTML, CSS, and JavaScript using the Noroff API.

### Pages

- /index.html – product list + gender filter
- /product/index.html – single product (size + Add to Cart)
- /checkout/index.html – cart (qty +/−, remove, totals)
- /profile/index.html – shows saved username

### Scripts

- /js/index.js – fetch & render list
- /product/product.js – product detail + addToCart
- /checkout/checkout.js – render cart, totals, actions
- /profile/profile.js – shows username
- /js/shared/cart.js – cart helpers (get/save/add/clear + badge)
- /js/shared/loader.js – page loader 

### Data

API: "https://v2.api.noroff.dev/rainy-days"

### Usage

1. **Browse products**
   - Open /index.html.
   - Use **Male/Female** buttons to filter (click aside to clear).
   - Click a card to view details.

2. **View a product**
   - On /product/index.html?id=PRODUCT_ID:
     - Select a **size**.
     - Click **Add to Cart** (button changes color after adding).

3. **Cart & checkout**
   - Open /checkout/index.html.
   - Use **+ / −** to change quantity.
   - Click **Remove** to delete an item.
   - Totals update automatically; shipping is a flat **$30**.
   - Click **Checkout** to go to confirmation (cart clears).

4. **Cart badge**
   - The badge shows total item **quantity**.
   - Hidden when the cart is empty; updates on every page.

5. **Sign in (demo)**
   - Click the avatar on the home page to open the sign-in modal.
   - Enter a name → redirects to **Profile**.
   - Profile shows the saved username from localStorage (username).

6. **Loader**
   - A page loader overlay appears during fetch/navigation.
   - You can manually call loader.show() / loader.hide() around async work.

### View Online

- Live site:  https://krii41.github.io/JS1-Course-Assignment-UKriiva/

- GitHub repo: https://github.com/Krii41/JS1-Course-Assignment-UKriiva   


### Contact

Created by Urve Kriiva.