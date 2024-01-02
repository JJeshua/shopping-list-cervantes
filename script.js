const filterInput = document.querySelector("#filter-input");
const clearButton = document.querySelector("#clear-btn");
const itemList = document.querySelector(".main-content");

const updateUI = () => {
  let itemContainer = document.querySelector(".main-content");

  // don't render filter input if no items exist
  if (itemContainer.children.length == 0) {
    filterInput.style.display = "none";
    clearButton.style.display = "none";
    return;
  }

  filterInput.style.display = "block";
  clearButton.style.display = "block";
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("item")) {
    e.target.parentElement.remove();
    updateUI();
  }
};

itemList.addEventListener("click", removeItem);
