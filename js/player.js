class Player {
    constructor(name, money) {
        this.name = name;
        this.money = money;
        this.isFolded = false;
        this.roundBet = 0;
        this.cards = [];
    }
    bet(betAmount) {
        this.money = this.money - betAmount;
    }
    fold() {
        this.isFolded = true;
        cards = [];
    }
}

class CPU extends Player {
    constructor(name, money, difficulty) {
        super(name, money);
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