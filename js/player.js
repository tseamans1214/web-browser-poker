class Player {
    constructor(name, money, playerNumber) {
        // Set properties
        this.name = name;
        this.money = money;
        this.playerNumber = playerNumber;
        this.isFolded = false;
        this.roundBet = 0;
        this.cards = [];
        this.hand = 0;

        // Set html elements
        document.getElementById(`p${this.playerNumber}-name`).textContent = this.name;
        document.getElementById(`p${this.playerNumber}-money`).textContent = '$' + this.money;
        if (this.playerNumber === 0) {
            document.getElementById("p0-amount").value = 0;
        }
    }
    setCards(cards) {
        this.cards = cards;
        document.getElementById(`p${this.playerNumber}-c1`).src = this.cards[0].image;
        document.getElementById(`p${this.playerNumber}-c2`).src = this.cards[1].image;
    }
    bet(betAmount) {
        this.money = this.money - betAmount;
        this.roundBet = this.roundBet + betAmount;
        document.getElementById(`p${this.playerNumber}-money`).textContent = '$' + this.money;
        logGame(`${this.name} bets $${betAmount}!`);
        return betAmount;
    }
    subtractMoney(amount) {
        this.money = this.money - amount;
        document.getElementById(`p${this.playerNumber}-money`).textContent = '$' + this.money;
        return amount;
    }
    fold() {
        this.isFolded = true;
        cards = [];
        document.getElementById(`p${this.playerNumber}-c1`).src = "card-back.png";
        document.getElementById(`p${this.playerNumber}-c2`).src = "card-back.png";
    }
    resetPlayer() {
        this.isFolded = false;
        this.roundBet = 0;
        this.cards = [];
        document.getElementById(`p${this.playerNumber}-c1`).src = "card-back.png";
        document.getElementById(`p${this.playerNumber}-c2`).src = "card-back.png";
    }
}

class CPU extends Player {
    constructor(name, money, playerNumber, difficulty) {
        super(name, money, playerNumber);
        this.difficulty = difficulty;
    }
    choice() {
        var pick = Math.random;
        if (pick <= .5) {
            this.bet(1);
        } else {
            this.fold();
        }
    }
}