const itemInput = document.querySelector("#item-input");
const addButton = document.querySelector("#btn-add");
const itemList = document.querySelector(".main-content");
const filterInput = document.querySelector("#filter-input");
const clearButton = document.querySelector("#clear-btn");

// updates UI to check if the filter input and clear all button should be rendered
const updateUI = () => {
  let itemContainer = document.querySelector(".main-content");

  // don't render 'filter input' if no items exist
  if (itemContainer.children.length == 0) {
    filterInput.style.display = "none";
    clearButton.style.display = "none";
    return;
  }

  // show 'filter input' and 'clear all' button
  filterInput.style.display = "block";
  clearButton.style.display = "block";
};

// handle item input field
const itemInputHandler = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addItem(e);
  }
};

// create new item
const createItem = (item) => {
  const div = document.createElement("div");
  div.className = "item";
  div.appendChild(document.createTextNode(item));

  const img = document.createElement("img");
  img.src = "./assets/icons/xmark-solid.svg";
  img.alt = "delete item";
  img.className = "remote-item-icon";
  div.appendChild(img);

  return div;
};

// add item to shopping list
const addItem = (e) => {
  e.preventDefault();

  // input validation
  if (itemInput.value === "") return;

  // create new item and add to item list
  itemList.appendChild(createItem(itemInput.value));
  itemInput.value = "";

  updateUI();
};

// removes the parent item of the 'remove icon' that is clicked
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("item")) {
    e.target.parentElement.remove();
    updateUI();
  }
};

// clears the entire shopping list and updates the UI
const clearAll = (e) => {
  let itemContainer = document.querySelector(".main-content");
  while (itemContainer.firstChild) {
    itemContainer.removeChild(itemContainer.firstChild);
  }
  updateUI();
};

itemInput.addEventListener("keypress", itemInputHandler);
addButton.addEventListener("click", addItem);
itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearAll);
