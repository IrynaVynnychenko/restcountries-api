let mainButton = document.querySelector("#submit-button");
let link = document.querySelector(".link");
let countries = {};
let block = document.querySelector(".block");
let ul = document.querySelector("ul");
const searchCountry = document.querySelector("#searchCountry");
const section = document.querySelector(".section");

mainButton.addEventListener("click", async (e) => {
  const responce = await fetch("https://restcountries-v1.p.rapidapi.com/all", {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "70c49cd25emsh140460a0bad8590p18e1e4jsnafd4533a4182",
    },
  });

  countries = await responce.json();
  console.log(countries);

  const searchedCountry = countries.filter(
    (country) => searchCountry.value === country.name
  );

  const table = document.createElement("table");
  block.appendChild(table);

  searchedCountry.forEach((country) => {
    const tr = document.createElement("tr");
    for (const countryIndex in country) {
      const th = document.createElement("th");
      th.innerHTML = countryIndex;
      tr.appendChild(th);
    }
    table.appendChild(tr);
    const trAnother = document.createElement("tr");
    table.appendChild(trAnother);

    for (const key in country) {
      const td = document.createElement("td");
      trAnother.appendChild(td);
      if (typeof country[key] === 'object') {
        for (const item in country[key]) {
          const span = document.createElement("span");
          td.appendChild(span);
          span.innerHTML = Array.isArray(country[key]) ? `${country[key][item]}` : `${item}: ${country[key][item]}`
        }
      } else {
        td.innerHTML = country[key];
      }
    }

    // let iframe = document.createElement("iframe");
    // iframe.src = `https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&hl=es&z=4&output=embed`;
    // section.appendChild(iframe);
  });
});

link.addEventListener("click", (e) => {
  e.preventDefault();
});
