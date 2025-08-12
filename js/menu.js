const orderArray = [];

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

function getLocalStorage() {
    const storedOrderArray = localStorage.getItem("ListItems"); 
    if (storedOrderArray) {
        orderArray.length = 0;
        orderArray.push(...JSON.parse(storedOrderArray));
        renderItem();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    getLocalStorage();
});