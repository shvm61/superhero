(function () {
  const url = "https://www.superheroapi.com/api.php/639906516881318";
  const search_bar = document.querySelector(".form-control");
  const card_container = document.querySelector(".card-container");
  const modal = document.querySelector(".modal-body");
  const header = document.querySelector("header");
  //   const more = document.querySelector(".more");
  // console.log(header);

  search_bar.addEventListener("keyup", showSearch);
  document.addEventListener("click", eventDecider);

  function eventDecider(e) {
    if (e.target.classList.contains("more")) showHero(e);
  }
  function showSearch() {
    let search_value = search_bar.value;
    if (search_value) {
      header.style.display = "none";
      console.log("headerrrr");
    } else header.style.display = "block";

    //   console.log(search_value);
    let items;
    async function fetch_cards() {
      let response = await fetch(`${url}/search/${search_value}`);
      items = await response.json();
      // console.log("Items ", items);
      card_container.innerHTML = "";
      for (let i = 0; i < items.results.length; i++) {
        let item = items.results[i];
        let aliases = item.biography.aliases.join(", ");
        //   console.log(aliases);
        let div = `<div class="card m-2" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">
          ${aliases}
        </p>
        <button type="button" class="more btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-id="${item.id}">
  MORE
</button>
         
      </div>
    </div>`;
        card_container.innerHTML += div;
      }
    }
    fetch_cards();
  }

  function showHero(e) {
    modal.innerHTML = "";
    async function fetch_data() {
      let targetId = e.target.getAttribute("data-id");
      //   console.log(targetId);
      let response = await fetch(`${url}/${targetId}`);
      let item = await response.json();
      let affiliates = item.connections["group-affiliation"];
      // let el = `<div class="card" style="width: 18rem;">
      //   <img class="card-img-top" src="${item.image.url}" alt="Card image cap" />
      //   <div class="card-body">
      //     <h5 class="card-title">${item.name}</h5>
      //     <p class="card-text">
      //       ${affiliates}
      //     </p>
      //   </div>
      // </div>`;
      let el = ` <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${item.image.url}" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">${item.name}</h5>
      <p class="card-text">
        ${affiliates}
      </p>
    </div>
  </div>
  <div class="hero-details">
    <h5 class="ml-5 position-relative">Power Stats</h5>

    <h6 class="ml-2 position-relative">
      Strength:
      <p class="float-right">${item.powerstats.strength}</p>
    </h6>
    <h6 class="ml-2 position-relative">
      Speed:
      <p class="float-right">${item.powerstats.speed}</p>
    </h6>
    <h6 class="ml-2 position-relative">
      Power:
      <p class="float-right">${item.powerstats.power}</p>
    </h6>
    <h6 class="ml-2 position-relative">
      Combat:
      <p class="float-right">${item.powerstats.combat}</p>
    </h6>
    <h5 class="ml-5 position-relative">Biography</h5>

    <h6 class="ml-2 position-relative">
      Full Name:
    </h6>
    <div style="text-align: center;">
      <p class="">${item.biography["full-name"]}</p>
    </div>
    <h6 class="ml-2 position-relative">
      Place of Birth:
    </h6>
    <div style="text-align: center;">
      <p class="">${item.biography["place-of-birth"]}</p>
    </div>
    <h6 class="ml-2 position-relative">
      First Appearance:
    </h6>
    <div style="text-align: center;">
      <p class="">${item.biography["first-appearance"]}</p>
    </div>
    <h6 class="ml-2 position-relative">
      Publisher:
    </h6>
    <div style="text-align: center;">
      <p class="">${item.biography.publisher}</p>
    </div>
  </div>`;
      modal.innerHTML = el;
      const fab = document.querySelector(".add-fav");

      let attr = document.createAttribute("data-id");
      attr.value = item.id;

      fab.setAttributeNode(attr);
      if (localStorage.getItem(item.id)) {
        fab.classList.remove("btn-primary");
        fab.classList.add("btn-danger");
        fab.innerHTML = "Remove from Fav";
      } else {
        fab.classList.remove("btn-danger");
        fab.classList.add("btn-primary");
        fab.innerHTML = "Add to fav";
      }
      console.log(item);
    }
    fetch_data();
  }
})();
