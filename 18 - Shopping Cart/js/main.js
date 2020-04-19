if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    const removeBtns = document.querySelectorAll('.btn-danger');
    const quantityInputs = document.querySelectorAll('.cart-quantity-input');
    const addCartBtn = document.querySelectorAll('.shop-item-button');

    removeBtns.forEach(btn => btn.addEventListener('click', removeItem))

    quantityInputs.forEach(input => input.addEventListener('change', quantityChanged))

    addCartBtn.forEach(btn => btn.addEventListener('click', addToCartClicked));

    document.querySelector('.btn-purchase').addEventListener('click', purchaseClicked)

}

function removeItem(e) {
    const btnClicked = e.target;

    btnClicked.parentElement.parentElement.remove();
    updateCartTotal()
}

function updateCartTotal() {
    const cartItemContainer = document.querySelectorAll('.cart-items')[0];
    const cartRows = cartItemContainer.querySelectorAll('.cart-row')
    let total = 0;

    cartRows.forEach(cartRow => {
        const priceElement = cartRow.querySelectorAll('.cart-price')[0];
        const quantityElement = cartRow.querySelectorAll('.cart-quantity-input')[0];

        const price = parseFloat(priceElement.innerText.replace('$', ''))
        const quantity = quantityElement.value

        total = total + (price * quantity)
    });

    total = Math.round(total * 100) / 100

    document.querySelector('.cart-total-price').innerText = '$' + total
}

function quantityChanged(e) {
    const input = e.target;

    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal()
}

function addToCartClicked(e) {
    const btn = e.target;

    const shopItem = btn.parentElement.parentElement;

    const title = shopItem.querySelector('.shop-item-title').innerText;
    const price = shopItem.querySelector('.shop-item-price').innerText;
    const imgSrc = shopItem.querySelector('.shop-item-image').src;

    addItemToCart(title, price, imgSrc);
    updateCartTotal()
}

function addItemToCart(title, price, src) {
    const cartRow = document.createElement('div');
    const cartItems = document.querySelector('.cart-items')
    const cartItemNames = document.querySelectorAll('.cart-item-title');

    cartRow.classList.add('cart-row');

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }


    const cartRowContent = `
          <div class="cart-item cart-column">
            <img
              class="cart-item-image"
              src="${src}"
              width="100"
              height="100"
            />
            <span class="cart-item-title">${title}</span>
          </div>
          <span class="cart-price cart-column">${price}</span>
          <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1" />
            <button class="btn btn-danger" type="button">REMOVE</button>
          </div>
        `

    cartRow.innerHTML = cartRowContent

    cartItems.append(cartRow);

    cartRow.querySelector('.btn-danger').addEventListener('click', removeItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChanged)
}

function purchaseClicked() {
    const cartItems = document.querySelector('.cart-items');

    if (cartItems.hasChildNodes()) {
        alert('Thank you for your purchase')

        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal()
    }
}
