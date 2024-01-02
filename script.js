const filterInput = document.querySelector("#filter-input");
const clearButton = document.querySelector("#clear-btn");
const itemList = document.querySelector(".main-content");

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

itemList.addEventListener("click", removeItem);
clearButton.addEventListener("click", clearAll);
