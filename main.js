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

  searchedCountry.forEach((country, countryIndex) => {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.innerHTML = `${countryIndex + 1}. ${country.name}, capital - ${
      country.capital
    }`;
    const iframe = document.createElement("iframe");
    iframe.src = `https://maps.google.com/maps?q=${country.latlng[0]},${country.latlng[1]}&hl=es&z=4&output=embed`;
    section.appendChild(iframe);

    let langUl = document.createElement("ul");
    li.appendChild(langUl);
    let translations = country.translations;

    for (const lang in translations) {
      let liLang = document.createElement("li");
      langUl.appendChild(liLang);
      liLang.innerHTML = `${lang}: ${translations[lang]}`;
    }
  });
});

link.addEventListener("click", (e) => {
  e.preventDefault();
});
