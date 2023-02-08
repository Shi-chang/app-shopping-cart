// Ensures that the body is loaded when script starts to work.
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Script starts to work.
function ready() {
    let removeCartItemButtons = document.getElementsByClassName("btn-danger");
    // Adds even listeners to removeCartItemButtons
    for (let i = 0; i < removeCartItemButtons.length; i++) {
        let button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    // Adds even listeners to quantityInputs
    let quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("click", quantityChange);
    }
    // Adds even listeners to addToCartButton
    let addToCartButton = document.getElementsByClassName("shop-item-button");
    for (let i = 0; i < addToCartButton.length; i++) {
        let button = addToCartButton[i];
        button.addEventListener("click", addToCartClick)
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked);
}

// Handls the click on the purchase button.
function purchaseClicked() {
    alert("Thank you for your purchase!");
    let cartItems = document.getElementsByClassName("cart-items")[0];

    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
}

// Handles the click on the quantity input.
function quantityChange(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    updateCartTotal();
}

// Handles the click on the remove cart button.
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

// Handles the click on add to cart button.
function addToCartClick(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    let price = shopItem.getElementsByClassName("shop-item-price")[0].innerText.replace("$", "");
    let imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;

    addItemToCart(title, price, imageSrc);
    updateCartTotal();
}

// Adds an item to the cart.
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    let cartItems = document.getElementsByClassName("cart-items")[0];
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");

    for (let i = 0; i < cartItemNames.length; i++) {
        console.log(title);
        console.log(cartItemNames[i].innerText);
        // console.log(cartItemNames[i].innerText);
        if (title === cartItemNames[i].innerText) {
            alert("This item is already in the cart.");
            return;
        }
    }
    let cartRowContent = `
                        <div class="cart-item cart-column">
                            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                            <span class="cart-item-title">${title}</span>
                        </div>
                        <span class="cart-price cart-column">$${price}</span>
                        <div class="cart-quantity cart-column">
                            <input class="cart-quantity-input" type="number" value="1">
                            <button class="btn btn-danger" type="button">REMOVE</button>
                        </div>`
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem);
    let quantityInputs = cartRow.getElementsByClassName("cart-quantity-input")[0];
    quantityInputs.addEventListener("click", quantityChange);
}

// Updates the total price.
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName("cart-items")[0];
    let cartRows = cartItemContainer.getElementsByClassName("cart-row");
    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName("cart-price")[0];
        let quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];

        let price = parseFloat(priceElement.innerText.replace("$", ""));
        let quantity = quantityElement.value;

        total += price * quantity;
        total = Math.round(total * 100) / 100;
    }

    document.getElementsByClassName("cart-total")[0].innerText = "$" + total;
}
