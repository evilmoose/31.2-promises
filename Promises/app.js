let number = 7;
const BASE_URL = "http://numbersapi.com";

// 1.
$.getJSON(`${BASE_URL}/${number}?json`)
    .then((data) => {
        console.log(data);
    });

// 2.
let numbers = [5, 4, 9];
$.getJSON(`${BASE_URL}/${numbers}?json`)
    .then((data) => {
        console.log(data);
    });

// 3.
Promise.all(Array
    .from({ length: 4 }, () => {
        return $.getJSON(`${BASE_URL}/${number}?json`);
    }))
    .then((facts) => {
        facts.forEach((data) => $("body")
            .append(`<p>${data.text}</p>`));
  });