//Butoni per shfaqjen dhe mbylljen e cartes
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

cartIcon.onclick = () => {
  cart.classList.add('active')
}

closeCart.onclick = () => {
  cart.classList.remove('active')
}
//Inicializimi i tabeles me produkte ne cart
let carts = document.getElementById('cart')
let templateRow = carts.rows[1].cloneNode(true)
carts.deleteRow(1)

//funksioni per fshirjen e rreshtit me butonin X ne cart
function removeFromCart(row) {
  row.parentNode.removeChild(row)
}
var subtotals = []
function addToCart(product, price) {
  let rows = carts.getElementsByTagName('tr')
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[0].innerHTML === product) {
      //Nese produkti ekziston
      let quantity = parseInt(
        rows[i].cells[2].getElementsByTagName('input')[0].value,
      )
      let subtotal = quantity * price + price
      rows[i].cells[2].getElementsByTagName('input')[0].value = quantity + 1
      rows[i].cells[3].innerHTML = '$' + subtotal.toFixed(2)
      subtotals.push(subtotal)
      return
    }
  }

  // Nese produkti nuk ekziston e shton nje rresht te ri
  let newRow = templateRow.cloneNode(true)
  newRow.cells[0].innerHTML = product
  newRow.cells[1].innerHTML = '$' + price.toFixed(2)
  newRow.cells[2].getElementsByTagName('input')[0].value = 1
  newRow.cells[3].innerHTML = '$' + price.toFixed(2)
  carts.appendChild(newRow)

  let deleteButton = document.createElement('button')
  deleteButton.innerHTML = 'x'
  deleteButton.addEventListener('click', function () {
    removeFromCart(newRow)
  })
  newRow.cells[4].appendChild(deleteButton)
  carts.appendChild(newRow)
}
