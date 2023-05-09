$(() => {
    const BASE_URL = "https://pokeapi.co/api/v2";
  
    // 1.
    const part1 = async () => {
      let data = await $.getJSON(`${BASE_URL}/pokemon/?limit=1000`);
      console.log(data);
    }
  
    // 2.
    const part2 = async () => {
      let allData = await $.getJSON(`${BASE_URL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map((url) => $.getJSON(url))
      );
      pokemonData.forEach((p) => console.log(p));
    }
  
    // 3.
    const part3 = async () => {
      let allData = await $.getJSON(`${BASE_URL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map(url => $.getJSON(url))
      );
      let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
      );
      descriptions = speciesData.map((d) => {
        let descriptionObj = d.flavor_text_entries.find(
          entry => entry.language.name === "en"
        );
        return descriptionObj
          ? descriptionObj.flavor_text
          : "No description available.";
      });
      descriptions.forEach((desc, i) => {
        console.log(`${pokemonData[i].name}: ${desc}`);
      });
    }
  
    // 4.
    const $btn = $("button");
    const $pokeArea = $("#pokemon-area");
  
    $btn.on("click", async () => {
      $pokeArea.empty();
      let allData = await $.getJSON(`${BASE_URL}/pokemon/?limit=1000`);
      let randomPokemonUrls = [];
      for (let i = 0; i < 3; i++) {
        let randomIdx = Math.floor(Math.random() * allData.results.length);
        let url = allData.results.splice(randomIdx, 1)[0].url;
        randomPokemonUrls.push(url);
      }
      let pokemonData = await Promise.all(
        randomPokemonUrls.map((url) => $.getJSON(url))
      );
      let speciesData = await Promise.all(
        pokemonData.map(p => $.getJSON(p.species.url))
      );
      speciesData.forEach((d, i) => {
        let descriptionObj = d.flavor_text_entries.find((entry) => {
          return entry.language.name === "en";
        });
        let description = descriptionObj ? descriptionObj.flavor_text : "";
        let name = pokemonData[i].name;
        let imgSrc = pokemonData[i].sprites.front_default;
        $pokeArea.append(makePokeCard(name, imgSrc, description));
      });
    });
  
    const makePokeCard = (name, imgSrc, description) => {
      return `
        <div class="card">
          <h1>${name}</h1>
          <img src=${imgSrc} />
          <p>${description}</p>
        </div>
      `;
    }
  });