// import axios from "axios";
// use fetch instead of axios (need webpack to run axios in client side)

const newItemButton = document.getElementById("create-item-form");
const inventoryList = document.getElementById("inventory-list");
const showAllItemsButton = document.getElementById("show-all-items-button");

// eventually use JSON array in server instead of these dummy arrays
// once using express routes to store, update, and retrieve inventory items
const itemsArray = [];
const deletedItemsArray = [];

newItemButton.addEventListener("submit", (e) => {
  e.preventDefault();
  let newItemObject = {
    name: e.target.item.value,
    quantity: e.target.quantity.value,
  };
  itemsArray.push(newItemObject);
  // list should also refresh after an add
  showItems();
});

showAllItemsButton.addEventListener("click", showItems);

function showItems() {
  while (inventoryList.firstChild) {
    inventoryList.removeChild(inventoryList.firstChild);
  }
  itemsArray.map((item) => {
    let itemElement = document.createElement("li");
    itemElement.innerHTML = item.name;

    // each item gets a DELETE button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "DELETE";
    deleteButton.addEventListener("click", async () => {
      const response = await fetch("/api/");
      const resultingData = await response.json();
      console.log(`array came back as: ${resultingData}`);

      // toggle grey-out item in the list
      if (itemElement.style.color === "grey") itemElement.style.color = "black";
      else itemElement.style.color = "grey";

      // toggle display name on the button
      if (deleteButton.innerHTML === "DELETE") {
        deleteButton.innerHTML = "UN-DELETE";
      } else deleteButton.innerHTML = "DELETE";

      // wont actually delete items. instead grey out and allow un-delete
      // itemElement.addEventListener("click", (e) => {
      // inventoryList.removeChild(itemElement);
      // }
    });

    // each item gets an EDIT button
    let editButton = document.createElement("button");
    editButton.innerHTML = "EDIT";
    editButton.addEventListener("click", (e) => {
      // here, instead use fetch API to hit back end route
      // for the PUT request, supplying a body containing item.name
      // so the route can query the JSON array for the correct item
      // before mutating it
      // but first, actually have this edit button
      // toggle on the visibility of a modal (w/ item.name in its scope)
      // the modal will offer a form to edit name & quantity
      // from that form submission, use the new values captured (e.name, e.quantity)
      // (along with existing item.name)
      // to build up the object to send as body in PUT request (fetch)

      let idx = itemsArray.indexOf(item);
      let theItem = itemsArray[idx];
      console.log(`got the item, its ${item.name}`);
      console.log(`got the item, its ${theItem.name}`);
      console.log(`and its index is ${idx}`);

      // theItem.name = "editedItem";
      // list should also refresh after an edit
      showItems();
    });

    itemElement.appendChild(deleteButton);
    itemElement.appendChild(editButton);
    inventoryList.appendChild(itemElement);
  });
}
