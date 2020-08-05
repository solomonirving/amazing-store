let cartCount = document.querySelector(".shopping-cart-count");
let subtotalCount = document.querySelector(".subtotal-count")
let buttons = document.querySelectorAll(".button-1");
// let basketItem = document.querySelector(".basket__item");
let items = [
    {
        id: "12345",
        tag: "startup",
        title: "The Lean Startup: How Constant Innovation Creates Radically Successful Businesses",
        price: 12.00,
        rating: "&#11088; &#11088; &#11088; &#11088; &#11088;",
        inCart: 0
    },
    {
        id: "67891",
        tag: "kitchenaid",
        title: "Kitchenaid Professional 600 Stand Mixer 6 quart, Empire Red",
        price: 279.00,
        rating: "&#11088; &#11088; &#11088; &#11088; &#11088;",
        inCart: 0
    },
    {
        id: "111213",
        tag: "charger",
        title: "iPhone Charger, 3Pack 10FT Lightning",
        price: 12.00,
        rating: "&#11088; &#11088; &#11088; &#11088; &#11088;",
        inCart: 0
    },
    {
        id: "141516",
        tag: "echo",
        title: "Amazon Echo (3rd generation) | Smart speaker",
        price: 98.00,
        rating: "&#11088; &#11088; &#11088; &#11088; &#11088;",
        inCart: 0
    },
    {
        id: "1415165",
        tag: "monitor",
        title: "Samsung LC27F398FWNXZA 27 Inch Curved LED Monitor",
        price: 179.00,
        rating: "&#11088; &#11088; &#11088; &#11088; &#11088;",
        inCart: 0
    },
    {
        id: "202122",
        tag: "fitbit",
        title: "Fitbit Inspire HR Heart Rate and Fitness Tracker, One Size",
        price: 69.00,
        rating: "&#11088; &#11088; &#11088; &#11088; &#11088;",
        inCart: 0
    }
];

// Button Click Listener
for( let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
        cartNumbers(items[i]);
        totalCost(items[i]);
    })
}

// When page loads, the cart syncs with what we have on local storage
function pageLoadCartNumber() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        cartCount.textContent = productNumbers;
        // subtotalCount.textContent = productNumbers;
    }
}

// Function to update cart total
function cartNumbers(item) {
    let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);

        if( productNumbers ) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            cartCount.textContent = productNumbers + 1;
            // subtotalCount.textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            cartCount.textContent = 1;
            // subtotalCount.textContent = 1;
        }
    itemStorage(item)
}

// Function to add multiple items to the cart
function itemStorage(item) {
    let cartItems = localStorage.getItem('productsInCart');
        cartItems = JSON.parse(cartItems)

    if(cartItems != null) {

        if(cartItems[item.id] == undefined) {
            cartItems = {
                ...cartItems, 
                [item.id]: item
            }
        }
        cartItems[item.id].inCart += 1;
    } else {
        item.inCart = 1;
        cartItems = {
            [item.id]: item 
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

// Function to add totals
function totalCost(item) {
    let totalPrice = localStorage.getItem('totalCost');
        console.log(totalPrice)
        if(totalPrice) {
            totalPrice = parseFloat(totalPrice)
            localStorage.setItem('totalCost', totalPrice + item.price)
        } else {
            localStorage.setItem('totalCost', item.price)
    }
}

pageLoadCartNumber();