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
        this.highCard;

        // Set html elements
        document.getElementById(`p${this.playerNumber}-name`).textContent = this.name;
        document.getElementById(`p${this.playerNumber}-money`).textContent = '$' + this.money;
        if (this.playerNumber === 0) {
            document.getElementById("p0-amount").value = 0;
        }
    }
    setCards(cards) {
        this.cards = cards;
        
        if (getCardValue(this.cards[0].value) > getCardValue(this.cards[1].value)) {
            this.highCard = this.cards[0].value;
        } else {
            this.highCard = this.cards[1].value;
        }
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
    getHand() {
        if (this.hand === 23) {
            return "Royal Flush";
        } else if (this.hand === 22) {
            return "Straight Flush";
        } else if (this.hand === 21) {
            return "Four of a Kind";
        } else if (this.hand === 20) {
            return "Full House";
        } else if (this.hand === 19) {
            return "Flush";
        } else if (this.hand === 18) {
            return "Straight";
        } else if (this.hand === 17) {
            return "Three of a Kind";
        } else if (this.hand === 16) {
            return "Two Pair";
        } else if (this.hand === 15) {
            return "One Pair";
        } else if (this.hand === 14) {
            return "High Card: Ace";
        } else if (this.hand === 13) {
            return "High Card: King";
        } else if (this.hand === 12) {
            return "High Card: Queen";
        } else if (this.hand === 11) {
            return "High Card: Jack";
        } else {
            return "High Card: " + this.highCard;
        }
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