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
    itemList.style.display = "none";
    filterInput.style.display = "none";
    clearButton.style.display = "none";
    return;
  }

  itemList.style.display = "flex";
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

// filter item list
const filterItems = (e) => {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll(".item");

  items.forEach((item) => {
    const itemName = item.textContent.toLowerCase();
    const shouldDisplay = itemName.includes(text);
    item.style.display = shouldDisplay ? "flex" : "none";
  });
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
  let userInput = itemInput.value.trimRight();

  // input validation
  if (userInput === "") return;

  // create new item and add to item list
  let item = createItem(userInput);
  itemList.appendChild(item);
  addItemToLocalStorage(userInput);
  itemInput.value = "";

  updateUI();
};

// add item to local storage
const addItemToLocalStorage = (item) => {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

// removes the parent item of the 'remove icon' that is clicked
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("item")) {
    removeItemFromLocalStorage(e.target.parentElement.textContent);
    e.target.parentElement.remove();
    updateUI();
  }
};

// remove item from local storage
const removeItemFromLocalStorage = (item) => {
  let items = getItemsFromLocalStorage();
  items = items.filter((i) => i !== item);
  localStorage.setItem("items", JSON.stringify(items));
};

// clears the entire shopping list and updates the UI
const clearAll = (e) => {
  let itemContainer = document.querySelector(".main-content");
  while (itemContainer.firstChild) {
    itemContainer.removeChild(itemContainer.firstChild);
  }
  localStorage.clear();
  updateUI();
};

const getItemsFromLocalStorage = () => {
  if (localStorage.getItem("items") === null) return;

  let items = [];
  let itemNames = JSON.parse(localStorage.getItem("items"));
  itemNames.forEach((itemName) => {
    items.push(itemName);
  });

  return items;
};

// load items from local storage on page load
const onPageLoad = () => {
  let items = getItemsFromLocalStorage();
  if (items === undefined) return;
  items.forEach((item) => {
    itemList.appendChild(createItem(item));
  });
};

itemInput.addEventListener("keypress", itemInputHandler);
addButton.addEventListener("click", addItem);
itemList.addEventListener("click", removeItem);
filterInput.addEventListener("input", filterItems);
clearButton.addEventListener("click", clearAll);
onPageLoad();
updateUI();
