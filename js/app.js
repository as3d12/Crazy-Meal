"use strict";

const form = document.getElementById("item-form");
const clearButton = document.getElementById("clear-button");
const orderArray = [];

function addItem(name, price, imageFromPcUrl, imageFromLink) {
    this.ItemName = name;
    this.ItemPrice = price;
    this.ImageFromPcUrl = imageFromPcUrl;
    this.ImageFromLink = imageFromLink;
}

function renderItem() {
    const menuTableBody = document.querySelector(".menu-table-body");
    menuTableBody.innerHTML = "";
    orderArray.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.ItemName}</td>
            <td>${item.ItemPrice}</td>
            ${item.ImageFromPcUrl !== "" ? `
            <td>${item.ImageFromPcUrl ? `<img src="${item.ImageFromPcUrl}" alt="${item.ItemName}" style="max-width:60px;max-height:60px;">` : ""}</td>
            ` : `
            <td>${item.ImageFromLink ? `<img src="${item.ImageFromLink}" alt="${item.ItemName}" style="max-width:60px;max-height:60px;">` : ""}</td>
            `}
        `;
        menuTableBody.appendChild(row);
    });
}

function setLocalStorage() {
    localStorage.setItem("ListItems", JSON.stringify(orderArray));
}

function getLocalStorage() {
    const storedOrderArray = localStorage.getItem("ListItems");
    if (storedOrderArray) {
        const parsedArray = JSON.parse(storedOrderArray);
        orderArray.length = 0;
        orderArray.push(...parsedArray);
        renderItem();
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const imageFromPc = document.getElementById("ImageFromPc").files[0];
    const imageFromLink = document.getElementById("ImageFromlink").value;

    if (imageFromPc) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageFromPcUrl = e.target.result;
            const newItem = new addItem(name, price, imageFromPcUrl, imageFromLink);
            orderArray.push(newItem);
            setLocalStorage();
            renderItem();
            form.reset();
        };
        reader.readAsDataURL(imageFromPc);
    } else {
        const newItem = new addItem(name, price, "", imageFromLink);
        orderArray.push(newItem);
        setLocalStorage();
        renderItem();
        form.reset();
    }
});


getLocalStorage();

clearButton.addEventListener("click", function() {
    localStorage.removeItem("ListItems");
    orderArray.length = 0;
    renderItem();
});
