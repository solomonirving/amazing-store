let removeCartItemButton = document.querySelectorAll('.remove-button');
console.log(removeCartItemButton)
for(let i = 0; i < removeCartItemButton.length; i++) {
    let button = removeCartItemButton[i]
    button.addEventListener('click', function() {
        let removeButtonClicked = event.target
            removeButtonClicked.parentElement.remove()
            updateCartTotal()
    })
}

function updateCartTotal() {
    let 
}