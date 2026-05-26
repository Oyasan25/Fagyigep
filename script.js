// Global Cart Logic
let cart = JSON.parse(localStorage.getItem('iceCreamCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('overlay');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalDisplay = document.getElementById('cartTotal');
    const cartCountDisplay = document.getElementById('cartCount');

    // Initial UI Update
    updateCartUI();

    // 1. Drawer Controls
    if(document.getElementById('openCart')) {
        document.getElementById('openCart').onclick = () => {
            drawer.classList.add('open');
            overlay.style.display = 'block';
        };
    }

    if(document.getElementById('closeCart')) {
        document.getElementById('closeCart').onclick = closeCart;
    }
    
    if(overlay) overlay.onclick = closeCart;

    function closeCart() {
        drawer.classList.remove('open');
        overlay.style.display = 'none';
    }

    // 2. Add to Cart Logic
    document.querySelectorAll('.order-btn').forEach(btn => {
        // Skip buttons on the checkout page
        if(btn.closest('.checkout-form')) return;

        btn.onclick = (e) => {
            const card = e.target.closest('.machine-card');
            const name = card.querySelector('h2').innerText;
            const priceText = card.querySelector('.price').innerText;
            const price = parseInt(priceText.replace(/[^0-9]/g, ''));

            cart.push({ name, price });
            saveAndUpdate();
            
            drawer.classList.add('open');
            overlay.style.display = 'block';
        };
    });

    function saveAndUpdate() {
        localStorage.setItem('iceCreamCart', JSON.stringify(cart));
        updateCartUI();
    }

    function updateCartUI() {
        if(!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; color:#999; margin-top:50px;">Your bag is empty.</p>';
        } else {
            cart.forEach((item, index) => {
                total += item.price;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'cart-item-ui';
                itemDiv.innerHTML = `
                    <span style="font-weight:700;">${item.name}</span>
                    <span>${item.price.toLocaleString()} Ft</span>
                `;
                cartItemsContainer.appendChild(itemDiv);
            });
        }

        if(cartTotalDisplay) cartTotalDisplay.innerText = `${total.toLocaleString()} Ft`;
        if(cartCountDisplay) cartCountDisplay.innerText = cart.length;
    }

    // 3. Checkout Page Specific
    const completeBtn = document.querySelector('.checkout-form .order-btn');
    if(completeBtn) {
        completeBtn.onclick = () => {
            alert('Order Received! Thank you for shopping with ICE CREAM.');
            cart = [];
            localStorage.removeItem('iceCreamCart');
            window.location.href = 'index.html';
        };
    }
});