const params = new URLSearchParams(window.location.search);
const selectedID = params.get("id");
console.log("selectedID", selectedID);

const detailURL = `https://kea-alt-del.dk/t7/api/products/${selectedID}`;
console.log("detailURL", detailURL);

function loadData(url) {
  fetch(url).then((response) => {
    response.json().then((data) => {
      showDetails(data);
    });
  });
}

function showDetails(detail) {
    console.log("detail", detail);

    document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${detail.id}.webp`;

    document.querySelector(".detail_model").innerHTML = detail.productdisplayname;
}

loadData(detailURL);