// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// click/touch event handler that prevents double events
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// renders a list using a template function
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  // clear existing content if requested
  if (clear) {
    parentElement.innerHTML = "";
  }

  // loop through the list and insert template HTML
  list.forEach(item => {
    parentElement.insertAdjacentHTML(position, templateFn(item));
  });
}

// get a query parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  return params.get(param);
}

export function loadHeaderFooter() {
  // manually fill header
  const header = document.querySelector("header");
  if (header) {
    header.innerHTML = `
      <div class="logo">
        <img src="../public/json/images/noun_Tent_2517.svg" alt="tent logo" />
        <a href="../index.html">SleepOutside</a>
      </div>
      <div class="cart">
        <a href="../cart/index.html">Cart</a>
      </div>
    `;
  }

  // manually fill footer
  const footer = document.querySelector("footer");
  if (footer) {
    footer.innerHTML = `
      &copy;2025 ⛺ SleepOutside ⛺ WDD 330 ⛺ BYU-Idaho
    `;
  }
}
