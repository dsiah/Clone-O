function Player(name) {
	if (this instanceof Player) {
		this.name = name;
		this.hand = new Array(10);	
	} else {
		return Player(name);
	}
}

function Card(value) {
	if (this instanceof Card) {
		this.val = value;
	} else {
		return new Card(value);
	}
}

function Pile() {
	if (this instanceof Pile) {
		this.cards = [];
		this.size  = 0;
	} else {
		// To Catch error where programmer omits "new" keyword
		return new Pile();
	}
}

function Deck(capacity) {
	if (this instanceof Deck) {
		this.cards = new Array(capacity);
		this.size  = capacity;
		this.left  = capacity;
		
		for (var i = 0; i < capacity; i++) {
			this.cards[i] = new Card(i + 1);
		}
	} else {
		// To Catch error where programmer omits "new" keyword
		return new Deck(capacity);
	}
}


Player.prototype.swap = function(card, i, target) {
	var temp = this.hand[i];
	this.hand[i] = card;
	target.append(temp);
};

Deck.prototype.pop = function() {
	if (this.left > 0) {
		this.left -= 1;
		return this.cards.pop();	
	} else {
		// (TODO) Replace with recycle step once pile is created
		console.error("Under capacity in deck"); 
	}
};

Deck.prototype.insert = function(card) {
	// Insert at the bottom of the deck --
	// (TODO) Would like to port deck to optimal data structure (Linkedlist)
	if (this.left < this.capacity) {
		this.left += 1;
		this.cards.unshift(card); // unshift -> heebie jeebs
	} else {
		// (TODO) Create real exception later
		console.error("Over capacity in deck"); 
	}
};

Deck.prototype.shuffle = function() {
	var d = this.cards,
			n = this.size - 1,
			i, temp;

	while (n > 0) {
		// Calculate switch index
		i = Math.floor(Math.random() * n);

		// Swap cards in-place
		temp = d[n];
		d[n] = d[i];
		d[i] = temp;

		n--;
	}

	console.log(this.cards, d);
};

Pile.prototype.append = function(card) {
	this.size += 1;
	this.cards.push(card);
};

Pile.prototype.peek = function() {
	return this.cards[this.size - 1];
};

Pile.prototype.pop = function() {
	if (this.size < 1) {
		console.error("Error: Insufficient cards in pile to pop!");
	} else {
		this.size -= 1;
		return this.cards.pop();
	}
};

module.exports = {
	Deck: Deck,
	Pile: Pile,
	Card: Card,
	Player: Player
};