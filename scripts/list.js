const param = new URLSearchParams(window.location.search);
const selectedSeason = param.get("season");
console.log("selectedSeason", selectedSeason);

const productURL = `https://kea-alt-del.dk/t7/api/products?season=${selectedSeason}&limit=100`;
const listContainer = document.querySelector(".product_list_container");

let allData;

function getData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      allData = data;
      showProducts(allData);
    });
  });
}

document.querySelector(".back_button").addEventListener("click", event => {window.history.back()});

const filterGenderButtons = document.querySelectorAll(".filter_gender_buttons_container div");
filterGenderButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("event", event);
    filterGenderButtons.forEach((button) => {
      button.classList.remove("selcted");
    });
    event.target.classList.add("selcted");

    if (event.target.dataset.filter === "All") {
      showProducts(allData);
    } else {
      const filter = allData.filter((product) => {
        return product.gender === event.target.dataset.filter;
      });
      showProducts(filter);
    }
  });
});

const filterSeasonButtons = document.querySelectorAll(".filter_season_buttons_container div");
filterSeasonButtons.forEach((button) => {
  if(button.dataset.season === selectedSeason) {
    button.classList.add("selcted");
  }
  
  button.addEventListener("click", (event) => {
    window.location.href = `productlist.html?season=${event.target.dataset.season}`;
  });
});

const sortButton = document.querySelector(".sort_button");
sortButton.addEventListener("click", event => {
     const sortedData = allData.sort((a, b) => {
    const actualPriceA = a.discount ? getDiscountPrice(a.price, a.discount) : a.price;
    const actualPriceB = b.discount ? getDiscountPrice(b.price, b.discount) : b.price;

    return actualPriceA - actualPriceB;
  });
  showProducts(sortedData);
});

function showProducts(products) {
  console.log("Products", products);
  console.log("Number of products", products.length);

  listContainer.innerHTML = "";

  products.forEach((product) => {
    listContainer.innerHTML += `<article class="product ${product.soldout ? "soldout" : ""}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Placeholder" />
          <h3>${product.productdisplayname}</h3>
          <p>${product.brandname} - ${product.category}</p>
          <div>
           ${product.discount ? "<p class='discount_tag'>" + getDiscountPrice(product.price, product.discount) + " kr</p>" : ""}   
            <p>${product.price} kr  ${product.discount ? " <em>-" + product.discount + "%</em>" : ""}</p>
          </div>
          <p><a href="detailview.html?id=${product.id}">Read More</a></p>
          ${product.soldout ? "<p class='soldout_tag'>Sold Out</p>" : ""}
        </article>`;
  });
}

getData(productURL);

function getDiscountPrice(origianlPrice, discount) {
  return Math.round((origianlPrice * (100 - discount)) / 100);
}
