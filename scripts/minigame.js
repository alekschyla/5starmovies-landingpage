function Game(selector) {
    this.container = document.querySelector(selector);
    this.gameArray = [];
    this.oscars = [];
    this.gameTick = 3000;
    this.gameBoard = null;
    this.handPosition = [
        { x: 9, y: 19 },
        { x: 10, y: 19 }
    ];
    this.init();
}

Game.prototype.init = function () {

}

Game.prototype.render = function () {

};

Game.prototype.oscarsArray = function () {
    this.oscars = (new Array(20))
        .fill(1)
        .map(el => ({
            x: Math.floor(Math.random() * 20),
            y: -1,
            delay: 0
        }))
        for (let i = 0; i < this.oscars.length; i++){}
    return this.oscars
};

Game.prototype.oscarsMove = function () {
    this.oscars = this.oscarsArray();
    for (let i = 0; i < this.oscars.length; i++) {
        this.oscars[i].y = this.oscars[i].y + 1 + this.oscars[i].delay;
    }
    return this.oscars;
}

Game.prototype.oscarsInterval = function () {
    setInterval(this.oscarsMove(), this.gameTick);
}

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
