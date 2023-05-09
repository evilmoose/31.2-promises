$(() => {
    const BASE_URL = 'https://deckofcardsapi.com/api/deck';
  
    // 1.
    const part1 = async () => {
      let data = await $.getJSON(`${BASE_URL}/new/draw/`);
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    }
  
    // 2.
    const part2 = async () => {
      let firstCardData = await $.getJSON(`${BASE_URL}/new/draw/`);
      let deckId = firstCardData.deck_id;
      let secondCardData = await $.getJSON(`${BASE_URL}/${deckId}/draw/`);
      [firstCardData, secondCardData].forEach((card) => {
        let { suit, value } = card.cards[0];
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
      });
    }
  
    // 3.
    const setup = async () => {
      const $btn = $('button');
      const $cardArea = $('#card-area');
  
      let deckData = await $.getJSON(`${BASE_URL}/new/shuffle/`);
      $btn.show().on('click', async function() {
        let cardData = await $.getJSON(`${BASE_URL}/${deckData.deck_id}/draw/`);
        let cardSrc = cardData.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
          $('<img>', {
            src: cardSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
          })
        );
        if (cardData.remaining === 0) $btn.remove();
      });
    }
    setup();
  });