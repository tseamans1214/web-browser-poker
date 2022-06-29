var deck = new Deck();
var table;
var player1;
var player2;
async function startGame() {
    document.getElementById("game-menu-background").style.display = "none";
    
    deck.shuffle();
    player1 = new Player("Tommy", 2000);
    player2 = new CPU("CPU1", 2000, "easy");
    table = new Table(100, [player1, player2]);
    var cards =  await deck.drawCards(4);
    player1.cards = new Array(cards[0], cards[1]);
    player2.cards = [cards[2], cards[3]];
    document.getElementById("p1-name").textContent = player1.name;
    document.getElementById("p1-money").textContent = '$' + player1.money;
    console.log(player1.cards);
    document.querySelector("#p1-c1").src = player1.cards[0].image;
    document.querySelector("#p1-c2").src = player1.cards[1].image;
    document.getElementById("p1-amount").value = 0;
    document.getElementById("p2-name").textContent = player2.name;
    document.getElementById("p2-money").textContent = '$' + player2.money;
    logGame("Welcome to Web Browser Poker! Enjoy you match!");
    document.getElementById("ante").textContent = '$' + table.ante;
    document.getElementById("round-bet").textContent = '$' + 0;
    logGame(`The ante for this round is $${table.ante}`);
    logGame(`It is ${player1.name}'s turn, How much will you bet or will you fold`);
}

function p1Bet() {
    var betAmount = Number(document.getElementById("p1-amount").value);
    player1.bet(betAmount);
    document.getElementById("p1-money").textContent = '$' + player1.money;
    logGame(`Player 1 bets $${betAmount}!`);
}
function logGame(message) {
    const newLog = document.createElement("p"); 
    newLog.textContent = message;
    document.getElementById("sec-game-log").appendChild(newLog);

}












// let deckId = "syoupp5yb2o2";

// // fetch ('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
// //     .then(res => res.json())
// //     .then(data => {
// //         console.log(data);
// //         deckId = data.deck_id;
// //     })
// //     .catch(err => {
// //         console.log(`error ${err}`);
// //     });

// fetch (`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
// const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=9`

// fetch(url)
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//         // document.querySelector("#table-c1").src = data.cards[0].image;
//         // document.querySelector("#table-c2").src = data.cards[1].image;
//         // document.querySelector("#table-c3").src = data.cards[2].image;
//         // document.querySelector("#table-c4").src = data.cards[3].image;
//         // document.querySelector("#table-c5").src = data.cards[4].image;
//         // document.querySelector("#p1-c1").src = data.cards[5].image;
//         // document.querySelector("#p1-c2").src = data.cards[6].image;
//         // document.querySelector("#p2-c1").src = data.cards[7].image;
//         // document.querySelector("#p2-c2").src = data.cards[8].image;
//     })
//     .catch(err => {
//         console.log(`error ${err}`);
//     });