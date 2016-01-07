var Cards = require('./Cards');
var d = new Cards.Deck(20);

d.shuffle();

console.log(d.pop());
console.log(d);