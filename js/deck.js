class Deck {
    constructor() {
        this.deckId = "";
        this.getDeckId(); 
        console.log("hello " + this.deckId);
    }
    async getDeckId() {
        await fetch ('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
             .then(res => res.json())
             .then(data => {
                this.deckId = data.deck_id;
             })
             .catch(err => {
                 console.log(`error ${err}`);
             });
    }
    async drawCards(numCards) {
        var cards = await fetch (`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${numCards}`)
        .then(res => res.json())
        .then(data => {
            return data.cards;
        })
        .catch(err => {
            console.log(`error ${err}`);
        });
        return cards;
    }
    shuffle() {
        fetch (`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`);
    }

}