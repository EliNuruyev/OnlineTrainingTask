const productName = document.getElementById("productName");
const productPrice = document.getElementById("productPrice");
const add = document.querySelector(".add");
const box = document.querySelector(".box");
const productCount = document.querySelector(".productCount");
const productTotalPrice = document.querySelector(".productTotalPrice");

let arr = JSON.parse(localStorage.getItem("arr")) || [];
let sum = 0;

window.onload = function () {
  createProducts();
  sumPrice();
};

add.onclick = function (e) {
  e.preventDefault();
  let productNameVal = productName.value;
  let productPriceVal = productPrice.value;

  if (productNameVal && productPriceVal) {
    if (Number(productPriceVal)) {
      arr.push({
        id: arr.length,
        name: productNameVal,
        price: Number(productPriceVal),
      });
      localStorage.setItem("arr", JSON.stringify(arr));
      productName.value = "";
      productPrice.value = "";
      createProducts();
      sumPrice();
    } else {
      alert("Enter correct price");
    }
  } else {
    alert("Write information for 2 inputs");
  }
};

function createProducts() {
  box.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    box.innerHTML += `<li class = "products">${arr[i].name} (${arr[i].price} AZN) <button class = "btnDel" onclick="deleteProduct(${arr[i].id})">Sil</button></li>`;
  }
}

function sumPrice() {
  let totalPrice = arr.reduce((acc, item) => {
    acc += item.price;
    return acc;
  }, 0);
  productTotalPrice.innerText = totalPrice;
  productCount.innerText = arr.length;
}

function deleteProduct(id) {
  arr = arr.filter((item) => item.id != id);
  localStorage.setItem("arr", JSON.stringify(arr));
  createProducts();
  sumPrice();
}
