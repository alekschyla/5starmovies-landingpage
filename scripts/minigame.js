function Game(selector) {
    this.container = document.querySelector(selector);
    this.gameArray = [];
    this.gameBoard = null;
    this.handPosition = [
        {x: 9, y: 19},
        {x: 10, y: 19}
    ];
    this.init();
}

Game.prototype.init = function () {

}

Game.prototype.render = function() {

};

Game.prototype.oscarMove = function () {
const random = Math.ceil(Math.random() * 19);
console.log(random);
const oscars = new Array(20).fill(1).map(el => el = {x: random, y: -1});
console.log(oscars);
oscars[0].y += 1;
console.log(oscars);

};

Game.prototype.handMove = function () {

};

Game.prototype.checkIfOscarWasCatched = function () {

};

Game.prototype.renderGameBoard = function () {

};

Game.prototype.endGame = function () {

};

Game.prototype.setInterval = function () {

};
