(function () {
  const fav = document.querySelector(".add-fav");
   fav.addEventListener("click", addToFav);
  const card_container = document.querySelector(".card-container");
  console.log(card_container);

  function addToFav(e) {
    let id = e.target.getAttribute("data-id");
    let find_item = localStorage.getItem(id);
    if (find_item) {
      localStorage.removeItem(id);
      console.log("in fav js removed");
    } else {
      console.log("in fav js added");

      localStorage.setItem(id, "added");
    }
    const fab = document.querySelector(".add-fav");
    if (localStorage.getItem(id)) {
      fab.classList.remove("btn-primary");
      fab.classList.add("btn-danger");
      fab.innerHTML = "Remove from Fav";
    } else {
      fab.classList.remove("btn-danger");
      fab.classList.add("btn-primary");
      fab.innerHTML = "Add to fav";
    }
    console.log(Object.keys(localStorage));
  }
})();
