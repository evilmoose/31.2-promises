let favNumber = 9;
const BASE_URL = "http://numbersapi.com";

// 1.
const part1 = async () => {
  let data = await $.getJSON(`${BASE_URL}/${favNumber}?json`);
  console.log(data);
}
part1();

// 2.
const favNumbers = [7, 11, 22];
const part2 = async () => {
  let data = await $.getJSON(`${BASE_URL}/${favNumbers}?json`);
  console.log(data);
}
part2();

// 3.
async function part3() {
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => $.getJSON(`${BASE_URL}/${favNumber}?json`))
  );
  facts.forEach((data) => {
    $('body').append(`<p>${data.text}</p>`);
  });
}
part3();