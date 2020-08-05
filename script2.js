let cartCount = document.querySelector(".shopping-cart-count");
let subtotalCount = document.querySelector(".subtotal-count");
let buttons = document.querySelectorAll(".button-1");
let subtotalCost = document.querySelector('.subtotal-cost');
let basketItem = document.querySelector(".basket__item");
let shopping = document.querySelector(".shopping__basket");
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


// Subtotal Basket 
function subtotalBasket() {
    let shoppingBasketProducts = localStorage.getItem('productsInCart')
        shoppingBasketProducts = JSON.parse(shoppingBasketProducts)
    // let shoppingBasketProduct = localStorage.removeItem('productsInCart')
    //     shoppingBasketProduct = JSON.stringify(shoppingBasketProduct)
    if(shoppingBasketProducts && basketItem){
 
        basketItem.innerHTML = '';
        Object.values(shoppingBasketProducts).map(item => {
 
            let title = document.createElement("span");
            title.innerHTML = `${item.title}`;
            title.classList.add("pix")
            basketItem.appendChild(title);

            let pict = document.createElement("span");
            pict.innerHTML = `<img src= "./images/${item.tag}.jpeg">`;
            // pict.classList.add("pix");
            basketItem.appendChild(pict);

            let basketPrice = document.createElement("span");
            basketPrice.innerHTML = `$${item.price}.00`;
            basketPrice.classList.add("pix")
            basketItem.appendChild(basketPrice);
            
            let basketPrices = document.createElement("span");
            basketPrices.innerHTML = `$${item.price * item.inCart}.00`;
            basketPrices.classList.add("pix")
            // basketItem.appendChild(basketPrices);

            let ratings = document.createElement("span");
            ratings.innerHTML = `${item.rating}`
            ratings.classList.add("pix")
            basketItem.appendChild(ratings)

            let btn = document.createElement("BUTTON");  
            btn.innerHTML = "Remove";                   
            basketItem.appendChild(btn);
            btn.classList.add("remove-button", "pix");

            let rule = document.createElement("div");
            rule.innerHTML = `<hr>`;
            rule.classList.add("rule")
            basketItem.appendChild(rule);

            btn.addEventListener("click", function() {
                item.inCart--
                let newPrice = item.inCart * item.price;
                    if(newPrice <= 0 ) {
                        title.innerHTML = '';
                        pict.innerHTML = '';
                        basketPrice.innerHTML = '';
                        basketPrices.innerHTML = '';
                        ratings.innerHTML = '';
                        rule.innerHTML = '';
                        btn.classList.replace("pix", "hide")
                    }
                    basketPrices.innerHTML = `$${newPrice}.00`
                let oldCartNumber = localStorage.getItem('cartNumbers')
                    oldCartNumber = JSON.parse(oldCartNumber)
                    oldCartNumber - item.inCart - 1
                let cartCounts = document.querySelector(".subtotal-count");
                    cartCounts.innerHTML --
                let shoppingCartCounts = document.querySelector(".shopping-cart-count")
                    shoppingCartCounts.innerHTML--
                let newCartNumber = localStorage.setItem('cartNumbers', oldCartNumber - 1 )

                let newTotalCost = localStorage.getItem('totalCost')
                    newTotalCost = JSON.parse(newTotalCost)

                let newSubtotal = localStorage.setItem('totalCost', newTotalCost - item.price)
                let subtotals = document.querySelector('.subtotal-cost');
                    subtotals.innerHTML = localStorage.getItem('totalCost')
                let final = localStorage.getItem('totalCost')
                    final = JSON.parse(final)
                    if(final === 0) {
                        window.localStorage.clear();
                        let checkoutBanner = document.querySelector(".checkout__banner");
                        checkoutBanner.innerHTML = '';
                        checkoutBanner.innerHTML += (    
                        `
                            <div>
                                <img class="checkout__banner__image" src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                            </div>
                
                            <div>
                                    <h2>Your Shopping Basket is Empty</h2>
                                    <p>You have no items in your basket. To buy one or more items, click "Add to Basket" next to the item.</p>
                            </div>
                        `
                        )
                    }
            })
        }) 
    } 

}


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
    let subtotalNumbers = localStorage.getItem('totalCost');
    if(productNumbers) {
        cartCount.textContent = productNumbers;
        subtotalCount.textContent = productNumbers;
        subtotalCost.textContent = subtotalNumbers;
    }
}

// Function to update cart total
function cartNumbers(item) {
    let productNumbers = localStorage.getItem('cartNumbers');
        productNumbers = parseInt(productNumbers);

        if( productNumbers ) {
            localStorage.setItem('cartNumbers', productNumbers + 1);
            cartCount.textContent = productNumbers + 1;
            subtotalCount.textContent = productNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            cartCount.textContent = 1;
            subtotalCount.textContent = 1;
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
                cartItems, 
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

        if(totalPrice) {
            totalPrice = parseFloat(totalPrice)
            localStorage.setItem('totalCost', totalPrice + item.price)
        } else {
            localStorage.setItem('totalCost', item.price)
    }
    console.log(totalPrice)
}

pageLoadCartNumber();
subtotalBasket();