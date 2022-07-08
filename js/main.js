var deck = new Deck();
var table;
var player1;
var player2;
var round;
var player1Turn = false;
var cpuRaise = false;
async function startGame() {
    document.getElementById("bet").disabled = true;
    document.getElementById("fold").disabled = true;
    document.getElementById("game-menu-background").style.display = "none";
    deck.shuffle();
    player1 = new Player("Player", 2000, 0);
    player2 = new CPU("CPU1", 2000, 1, "easy");
    table = new Table(100, [player1, player2]);
    var cards =  await deck.drawCards(4);
    player1.setCards([cards[0], cards[1]]);
    player2.setCards([cards[2], cards[3]]);
    round = 1;
    await logGame("Welcome to Web Browser Poker! Have fun!");
    await table.collectAnte();
    await logGame(`It is ${player1.name}'s turn. Will you check, bet, or fold?`);
    document.getElementById("bet").disabled = false;
    document.getElementById("fold").disabled = false;
}

async function p0Bet() {
    document.getElementById("bet").disabled = true;
    document.getElementById("fold").disabled = true;
    var p0BetAmount = Number(document.getElementById("p0-amount").value);
    if (p0BetAmount < 0) {
        alert(`Your bet may not be less than 0!`);
        return;
    }
    if (p0BetAmount + player1.roundBet < table.roundBet) {
        alert(`You must bet at least $${table.roundBet-player1.roundBet} to continue!`);
        return;
    }
    await player1.bet(p0BetAmount);
    table.increasePot(p0BetAmount);
    let minBet = 0;
    if (player1.roundBet >= table.roundBet) {
        if (player1.roundBet == table.roundBet && cpuRaise) {

        } else {
            table.setRoundBet(player1.roundBet);
            cpuRaise = false;
            for (var i=1; i<table.players.length; i++) {
                await logGame(`It is ${table.players[i].name}'s turn. Will they bet or fold?`);
                var cpuBet = await table.players[i].choice(table.roundBet-table.players[i].roundBet);
                if (table.players[i].isFolded == false) {
                    table.increasePot(cpuBet);
                    if (cpuBet > table.roundBet) {
                        table.setRoundBet(cpuBet);
                        cpuRaise = true;
                    }
                }
            }
        }
    }
    if (table.checkPlayersPlaying() == false) {
        handleWinner(player1, "fold");
        return;
    }
    if (table.checkPlayersRoundBet()) {
        round++;
        for (let i=0; i<table.players.length; i++) {
            table.players[i].roundBet = 0;
        }
        table.setRoundBet(0);
        cpuRaise = false;
        var cards;
        if (round === 2) {
            cards = await deck.drawCards(3);
            table.addCards(cards);
        } else if (round === 3 || round === 4) {
            cards = await deck.drawCards(1);
            table.addCards(cards);
        } else {
            for (let i=1; i<table.players.length; i++) {
                table.players[i].revealCards();
            }
            await sleep(3000);
            var winner = table.calculateWinner();
            handleWinner(winner, "hand");
        }
        if (round < 5) {
            await logGame("Round: " + round);
            await logGame(`It is ${player1.name}'s turn. Will you check, bet, or fold?`);
        }
    } else {
        await logGame(`It is ${player1.name}'s turn. The round bet was raised to $${table.roundBet}. Will you call, raise, or fold?`);
        document.getElementById("p0-amount").value = table.roundBet - player1.roundBet;
    }
    console.log("Table Round Bet: " + table.roundBet);
    console.log("Player Round Bet: " + table.players[0].roundBet);
    console.log("CPU Round Bet: " + table.players[1].roundBet);
    document.getElementById("bet").disabled = false;
    document.getElementById("fold").disabled = false;

}

function p0Fold() {
    console.log("p0 fold");
    player1.fold();
    var winner = player2;
    handleWinner(winner, "fold")
}
async function logGame(message) {
    await sleep(1000);
    const newLog = document.createElement("p"); 
    newLog.textContent = message;
    document.getElementById("sec-game-log").appendChild(newLog);
    document.getElementById('sec-game-log').scrollTo(0,100000);

}
function sleep(ms) {
    return new Promise(
      resolve => setTimeout(resolve, ms)
    );
  }
function changeButtonText() {
    console.log("Round Bet: " + table.roundBet);
    console.log("Amount Bet: " + document.getElementById("p0-amount").value);
    if (Number(document.getElementById("p0-amount").value) === Number(table.roundBet-player1.roundBet)) {
        console.log("Check");
        document.getElementById("bet").value = "Check";
    } else {
        console.log("Raise");
        document.getElementById("bet").value = "Raise";
    }
}

async function resetRound() {
    document.getElementById("bet").disabled = true;
    document.getElementById("fold").disabled = true;
    player1.isFolded = false;
    player2.isFolded = false;
    cpuRaise = false;
    document.getElementById('win-menu-background').style.display = "none";
    round = 1;
    document.getElementById('sec-game-log').innerHTML = "";
    table.resetTable();
    deck.shuffle();
    var cards =  await deck.drawCards(4);
    player1.setCards([cards[0], cards[1]]);
    player2.setCards([cards[2], cards[3]]);
    table.collectAnte();
    await logGame("Round: " + round);
    await logGame(`It is ${player1.name}'s turn. Will you check, bet, or fold?`);
    document.getElementById("bet").disabled = false;
    document.getElementById("fold").disabled = false;
}

function handleWinner(winner, winType) {
    winner.money += table.pot;
    document.getElementById('win-menu-background').style.display = "flex";
    if (winType == "hand") {
        document.getElementById('winner-line').textContent = winner.name + " won with a " + winner.getHand() + "!";
    } else if (winType == "fold") {
        document.getElementById('winner-line').textContent = winner.name + " won because all other players folded!";
    }
    document.getElementById('win-amount').textContent = winner.name + " won $" + table.pot;
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