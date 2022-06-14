// import axios from "axios";
// use fetch instead of axios (need webpack to run axios in client side)

const newItemButton = document.getElementById("create-item-form");
const inventoryList = document.getElementById("inventory-list");
const showAllItemsButton = document.getElementById("show-all-items-button");
const editModal = document.getElementById("edit-modal");
const deleteModal = document.getElementById("delete-modal");

function toggleVisibility(element) {
  element.classList.toggle("hidden");
}

newItemButton.addEventListener("submit", (e) => {
  e.preventDefault();
  let newItemObject = {
    name: e.target.item.value,
    quantity: e.target.quantity.value,
  };
  // use fetch to make POST request to our "database"
  // itemsArray.push(newItemObject);
  // may want to await this, before refreshing the list ( showItems() )
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(newItemObject),
  };
  fetch("/api/", options);

  // list should also refresh after an add
  showItems();
});

showAllItemsButton.addEventListener("click", showItems);

async function showItems() {
  while (inventoryList.firstChild) {
    inventoryList.removeChild(inventoryList.firstChild);
  }

  const response = await fetch("/api/");
  const itemsArray = await response.json();
  // console.log(`array came back as: ${itemsArray}`);

  itemsArray.map((item) => {
    let itemElement = document.createElement("li");
    itemElement.innerHTML = item.name;

    // each item gets a DELETE button
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "DELETE";
    deleteButton.addEventListener("click", () => {
      // toggle grey-out item in the list
      if (itemElement.style.color === "grey") itemElement.style.color = "black";
      else itemElement.style.color = "grey";

      // toggle display name on the button
      if (deleteButton.innerHTML === "DELETE") {
        deleteButton.innerHTML = "UN-DELETE";
      } else deleteButton.innerHTML = "DELETE";

      toggleVisibility(deleteModal);

      // wont actually delete items. instead grey out and allow un-delete
      // itemElement.addEventListener("click", (e) => {
      // inventoryList.removeChild(itemElement);
      // }
    });

    // each item gets an EDIT button
    let editButton = document.createElement("button");
    editButton.innerHTML = "EDIT";
    editButton.addEventListener("click", (e) => {
      toggleVisibility(editModal);
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
