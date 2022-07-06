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

    async collectAnte() {
        await logGame(`The ante for this round is $${this.ante}`);
        for (var i=0; i<this.players.length; i++) {
            this.pot += this.players[i].subtractMoney(this.ante);
        }
        document.getElementById("pot").textContent = 'Pot: $' + this.pot;
    }

    checkPlayersRoundBet() {
        var allPlayersMatch = true;
        for (var i=0; i<this.players.length; i++) {
            if (this.players[i].roundBet != this.roundBet) {
                allPlayersMatch = false;
                return allPlayersMatch;
            }
        }
        return allPlayersMatch;
    }

    checkPlayersPlaying() {
        var stillPlaying = false;
        for (let i=1; i<this.players.length; i++) {
            if (this.players[i].isFolded == false) {
                stillPlaying = true;
                return stillPlaying;
            }
        }
        return stillPlaying;
    }

    calculateWinner() {
        var winnerHand = 0;
        var winnerIndex = -1;
        for (var i=0; i<this.players.length; i++) {
            for (var j=0; j<this.cards.length; j++) {
                this.players[i].cards.push(this.cards[j]);
            }
            this.players[i].hand = this.getPlayerHand(this.players[i]);
            console.log("Player " + i + " Hand: ");
            console.log(this.players[i].cards)
            console.log(this.players[i].hand);
        }

        for (var i=0; i<this.players.length; i++) {
            if (this.players[i].hand > winnerHand) {
                winnerHand = this.players[i].hand;
                winnerIndex = i;
            } else if (this.players[i].hand === winnerHand) {
                if (getCardValue(this.players[i].highCard) > getCardValue(this.players[winnerIndex].highCard)) {
                    console.log("Tie! Winner decided by high card");
                    winnerHand = this.players[i].hand;
                    winnerIndex = i;
                }
            }
        }
        return this.players[winnerIndex];
    }
    getCardValue(value) {
        if (value == "ACE") {
            return 14;
        } else if (value == "KING") {
            return 13;
        } else if (value == "QUEEN") {
            return 12;
        } else if (value == "JACK") {
            return 11;
        } else {
            return Number(value);
        }
    }
    getPlayerHand(player) {
        if (this.hasRoyalFlush(player.cards)) {
            return 23;
        } else if (this.hasStraightFlush(player.cards)) {
            return 22;
        } else if (this.hasFourOfAKind(player.cards)) {
            return 21;
        } else if (this.hasFullHouse(player.cards)) {
            return 20;
        } else if (this.hasFlush(player.cards)) {
            return 19;
        } else if (this.hasStraight(player.cards)) {
            return 18;
        } else if (this.hasThreeOfAKind(player.cards)) {
            return 17;
        } else if (this.hasTwoPair(player.cards)) {
            return 16;
        } else if (this.hasOnePair(player.cards)) {
            return 15;
        } else {
            return getCardValue(player.highCard);
            //return this.highCard(cards);
        } 
    }
    // Order of best hands, best to worst
    hasRoyalFlush(cards) {
        var codes = cards.map(x => x.code);
        if ((codes.includes('0D') && codes.includes('JD') && codes.includes('QD') 
            && codes.includes('KD') && codes.includes('AD')) ||
            (codes.includes('0H') && codes.includes('JH') && codes.includes('QH') 
            && codes.includes('KH') && codes.includes('AH')) ||
            (codes.includes('0C') && codes.includes('JC') && codes.includes('QC') 
            && codes.includes('KC') && codes.includes('AC')) ||
            (codes.includes('0S') && codes.includes('JS') && codes.includes('QS') 
            && codes.includes('KS') && codes.includes('AS'))) {
                console.log("Royal Flush: " + codes);
                return true;
            } else {
                return false;
            }
    }
    hasStraightFlush(cards) {
        var straightCards = this.hasStraight(cards);
        if (straightCards) {
            if (this.hasFlush(straightCards)) {
                return true;
            }
        }
        return false;
    }
    hasFourOfAKind(cards) {
        var values = cards.map(x => x.value);
        const count = values.reduce((accumulator, value) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
          }, {});
        if (Object.values(count).includes(4)){
            console.log("4 of a Kind");
            return true;
        }
        return false;
    }
    hasFullHouse(cards) {
        var values = cards.map(x => x.value);
        const count = values.reduce((accumulator, value) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
          }, {});
        if (Object.values(count).includes(3) && Object.values(count).includes(2)){
            console.log("Full House");
            return true;
        }
        return false;
    }
    hasFlush(cards) {
        var suitCounts = [0,0,0,0];
        for (var i=0; i<cards.length; i++) {
            if (cards[i].suit === 'SPADES') {
                suitCounts[0]++;
            } else if (cards[i].suit === 'DIAMONDS') {
                suitCounts[1]++;
            } else if (cards[i].suit === 'CLUBS') {
                suitCounts[2]++;
            } else if (cards[i].suit == 'HEARTS') {
                suitCounts[3]++;
            }
        }
        if (suitCounts.includes(5)) {
            console.log("FLUSH");
            return true;
        } else {
            return false;
        }
    }
    hasStraight(cards) {
        cards.sort(this.compareCards);
        var straight = [];
        var count = 0;
        for (var i=cards.length-1; i>0; i--) {
              if (this.getCardValue(cards[i].value)-this.getCardValue(cards[i-1].value) === 1) {
                  count++;
                  straight.push(cards[i]);
                  if (count === 4) {
                    straight.push(cards[i-1]);
                    break;
                  }
              } else {
                  count = 0;
                  straight = [];
              }
          }
          if (count === 4) {
              return straight.sort(this.compareCards);
          } else {
              return false;
          }
    }
    hasThreeOfAKind(cards) {
        var values = cards.map(x => x.value);
        const count = values.reduce((accumulator, value) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
          }, {});
        if (Object.values(count).includes(3)){
            console.log("3 of a Kind");
            return true;
        }
        return false;
    }
    hasTwoPair(cards) {
        var values = cards.map(x => x.value);
        const count = values.reduce((accumulator, value) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
          }, {});
        var pairCount = 0;
        for (var i=0; i<Object.values(count).length; i++) {
            if (Object.values(count)[i] == 2) {
                pairCount++;
            }
        }
        if (pairCount == 2) {
            console.log("Two Pair");
            return true;
        }
        return false;
    }
    hasOnePair(cards) {
        var values = cards.map(x => x.value);
        const count = values.reduce((accumulator, value) => {
            return {...accumulator, [value]: (accumulator[value] || 0) + 1};
          }, {});
        if (Object.values(count).includes(2)){
            console.log("One Pair");
            return true;
        }
        return false;
    }
    highCard(cards) {
        var values = cards.map(x => this.getCardValue(x.value));
        values.sort();
        console.log(values);
        return values[values.length-1];
    }
    compareCards(a, b) {
        if (getCardValue(a.value) < getCardValue(b.value)) {
          return -1;
        }
        if (getCardValue(a.value) > getCardValue(b.value)) {
          return 1;
        }
        // a must be equal to b
        return 0;
      }
}

function getCardValue(value) {
    if (value == "ACE") {
        return 14;
    } else if (value == "KING") {
        return 13;
    } else if (value == "QUEEN") {
        return 12;
    } else if (value == "JACK") {
        return 11;
    } else {
        return Number(value);
    }
}