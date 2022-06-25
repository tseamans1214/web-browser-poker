let deckId = "syoupp5yb2o2";

// fetch ('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         deckId = data.deck_id;
//     })
//     .catch(err => {
//         console.log(`error ${err}`);
//     });

fetch (`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=9`

fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        document.querySelector("#table-c1").src = data.cards[0].image;
        document.querySelector("#table-c2").src = data.cards[1].image;
        document.querySelector("#table-c3").src = data.cards[2].image;
        document.querySelector("#table-c4").src = data.cards[3].image;
        document.querySelector("#table-c5").src = data.cards[4].image;
        document.querySelector("#p1-c1").src = data.cards[5].image;
        document.querySelector("#p1-c2").src = data.cards[6].image;
        document.querySelector("#p2-c1").src = data.cards[7].image;
        document.querySelector("#p2-c2").src = data.cards[8].image;
    })
    .catch(err => {
        console.log(`error ${err}`);
    });