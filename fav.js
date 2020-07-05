const url = "https://www.superheroapi.com/api.php/639906516881318";
const card_container = document.querySelector(".card-container");

// console.log("inside fav ", card_container);

let fvrts = Object.keys(localStorage);
// console.log( fvrts);
document.addEventListener("click", eventDecider);
function eventDecider(e) {
  if (e.target.classList.contains("remove-fav")) removeFav(e);
}
function render() {
  console.log("inside render ");
  console.log(fvrts);

  card_container.innerHTML = "";
  for (let i = 0; i < fvrts.length; i++) {
    async function heroById() {
      let response = await fetch(`${url}/${fvrts[i]}`);
      let item = await response.json();
      let aliases = item.biography.aliases.join(", ");
      //   console.log(aliases);
      let div = `<div class="card m-2" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">
            ${aliases}
          </p>
          <button type="button" class="remove-fav btn btn-danger" data-toggle="modal" data-target="#exampleModal" data-id="${item.id}">
      Remove
      </button>
           
        </div>
      </div>`;
      card_container.innerHTML += div;
    }
    heroById();
  }
}

function removeFav(e) {
  let id = e.target.getAttribute("data-id");
  console.log(id);

  localStorage.removeItem(id);
  fvrts = Object.keys(localStorage);
  render();
  console.log("inside remove fav", fvrts);
}

window.onload = render();
