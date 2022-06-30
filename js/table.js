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

    }
}