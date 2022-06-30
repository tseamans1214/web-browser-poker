var deck = new Deck();
var table;
var player1;
var player2;
var round;
var player1Turn = false;
async function startGame() {
    document.getElementById("game-menu-background").style.display = "none";
    
    deck.shuffle();
    player1 = new Player("Tommy", 2000, 0);
    player2 = new CPU("CPU1", 2000, 1, "easy");
    table = new Table(100, [player1, player2]);
    var cards =  await deck.drawCards(4);
    player1.setCards([cards[0], cards[1]]);
    player2.setCards([cards[2], cards[3]]);
    round = 1;
    logGame("Welcome to Web Browser Poker! Enjoy you match!");
    table.collectAnte();
    logGame(`It is ${player1.name}'s turn, How much will you bet or will you fold`);
}

function main() {
    // while (true) {
    //     if (round == 1) {
    //         do {
    //             for (var i=0; table.players.length; i++) {
    //                 logGame(`It is ${table.players[i].name}'s turn, How much will you bet or will you fold`);
    //                 if (i === 0) {
    //                     player1Turn = true;
    //                 }
    //                 //while (player1Turn === true);
    //                 if (i !== 0) {
    //                     table.players[i].bet(10);
    //                 }
    //             }
    //         } while (table.checkPlayersRoundBet() === false);
    //     }
    // }
}

async function p0Bet() {
    var betAmount = Number(document.getElementById("p0-amount").value);
    player1.bet(betAmount);
    table.setRoundBet(betAmount);
    table.increasePot(betAmount);
    for (var i=1; i<table.players.length; i++) {
        logGame(`It is ${table.players[i].name}'s turn, How much will you bet or will you fold`);
        table.players[i].bet(betAmount);
        table.increasePot(betAmount);
    }
    if (table.checkPlayersRoundBet()) {
        round++;
    }
    var cards;
    if (round === 2) {
        cards = await deck.drawCards(3);
        table.addCards(cards);
    } else if (round === 3 || round === 4) {
        cards = await deck.drawCards(1);
        table.addCards(cards);
    } else {
        table.calculateWinner();
        resetRound();
    }
    logGame("Round: " + round);
    logGame(`It is ${player1.name}'s turn, How much will you bet or will you fold`);
}
function logGame(message) {
    const newLog = document.createElement("p"); 
    newLog.textContent = message;
    document.getElementById("sec-game-log").appendChild(newLog);
    document.getElementById('sec-game-log').scrollTo(0,100000);

}
function changeButtonText() {
    console.log("Round Bet: " + table.roundBet);
    console.log("Amount Bet: " + document.getElementById("p0-amount").value);
    if (Number(document.getElementById("p0-amount").value) === Number(table.roundBet)) {
        console.log("Check");
        document.getElementById("bet").value = "Check";
    } else {
        console.log("Raise");
        document.getElementById("bet").value = "Raise";
    }
}

async function resetRound() {
    round = 1;
    document.getElementById('sec-game-log').innerHTML = "";
    table.resetTable();
    deck.shuffle();
    var cards =  await deck.drawCards(4);
    player1.setCards([cards[0], cards[1]]);
    player2.setCards([cards[2], cards[3]]);
    table.collectAnte();

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