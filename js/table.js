class Table {
    constructor(ante, players) {
        // Set properties
        this.ante = ante;
        this.players = players;
        this.pot = 0;
        this.roundBet = 0;
        this.cards = [];

        // Set elements
        document.getElementById("pot").textContent = 'Pot: $' + this.pot;
        document.getElementById("ante").textContent = 'Ante: $' + this.ante;
        document.getElementById("round-bet").textContent = 'Round Bet: $' + this.roundBet;
    }

    increaseAnte(amount) {
        this.ante = this.ante + amount;
        document.getElementById("ante").textContent = 'Ante: $' + this.ante;
    }

    setAnte(ante) {
        this.ante = ante;
        document.getElementById("ante").textContent = 'Ante: $' + this.ante;
    }

    increasePot(amount) {
        this.pot = this.pot + amount;
        document.getElementById("pot").textContent = 'Pot: $' + this.pot;
    }

    setRoundBet(amount) {
        this.roundBet = amount;
        document.getElementById("round-bet").textContent = 'Round Bet: $' + this.roundBet;
    }

    resetRoundBet() {
        this.roundBet = 0;
        document.getElementById("round-bet").textContent = 'Round Bet: $' + this.roundBet;
    }

    addCards(cards) {
        for (var i=0; i<cards.length; i++) {
            this.cards.push(cards[i]);
        }
        console.log(this.cards);
        for (var i=0; i<this.cards.length; i++) {
            document.getElementById(`table-c${i+1}`).src = this.cards[i].image;
        }
    }

    resetTable() {
        this.pot = 0;
        this.roundBet = 0;
        this.cards = [];

        // Reset elements
        for (var i=1; i<=5; i++) {
            document.getElementById(`table-c${i}`).src = "card-back.png";
        }
        document.getElementById("pot").textContent = 'Pot: $' + this.pot;
        document.getElementById("round-bet").textContent = 'Round Bet: $' + this.roundBet;
        
        // Reset players
        for (var i=0; i<this.players.length; i++) {
            this.players[i].resetPlayer();
        }
    }

    collectAnte() {
        logGame(`The ante for this round is $${this.ante}`);
        for (var i=0; i<this.players.length; i++) {
            this.pot += this.players[i].subtractMoney(this.ante);
        }
        document.getElementById("pot").textContent = 'Pot: $' + this.pot;
    }

    checkPlayersRoundBet() {
        var allPlayersMatch = true;
        // for (var i=0; i<this.players.length; i++) {
        //     if (this.players[i].roundBet != this.roundBet) {
        //         allPlayersMatch = false;
        //         return allPlayersMatch;
        //     }
        // }
        return allPlayersMatch;
    }

    calculateWinner() {
        var winnerHand = 0;
        var winnderIndex = -1;
        for (var i=0; i<this.players.length; i++) {
            for (var j=0; j<this.cards.length; j++) {
                this.players[i].cards.push(this.cards[j]);
            }
            this.players[i].hand = getPlayerHand(this.players[i].cards);
        }

        for (var i=0; i<this.players.length; i++) {
            if (this.players[i].hand > winnerHand) {
                winnerHand = this.players[i].hand;
                winnderIndex = i;
            }
        }
        return this.players[winnderIndex];
    }
    getCardValue(value) {
        if (value === "ACE") {
            value = 14;
        } else if (value === "KING") {
            return 13
        } else if (value === "QUEEN") {
            return 12;
        } else if (value === "JACK") {
            return 11;
        } else {
            return Number(value);
        }
    }
    getPlayerHand(cards) {
        if (hasRoyalFlush(cards)) {
            return 23;
        } else if (hasStraightFlush(cards)) {
            return 22;
        } else if (hasFourOfAKind(cards)) {
            return 21;
        } else if (hasFullHouse(cards)) {
            return 20;
        } else if (hasFlush(cards)) {
            return 19;
        } else if (hasStraight(cards)) {
            return 18;
        } else if (hasThreeOfAKind(cards)) {
            return 17;
        } else if (hasTwoPair(cards)) {
            return 16;
        } else if (hasOnePair(cards)) {
            return 15;
        } else {
            return highCard(cards);
        } 
    }
    // Order of best hands, best to worst
    hasRoyalFlush(cards) {

    }
    hasStraightFlush(cards) {

    }
    hasFourOfAKind(cards) {

    }
    hasFullHouse(cards) {

    }
    hasFlush(cards) {

    }
    hasStraight(cards) {

    }
    hasThreeOfAKind(cards) {

    }
    hasTwoPair(cards) {

    }
    hasOnePair(cards) {

    }
    highCard(cares) {

    }
}