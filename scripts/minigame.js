function Game(selector) {
    this.container = document.querySelector(selector);
    this.gameArray = [];
    this.gameBoard = null;
    this.boardDimension = 20;
    this.cellDimension = (100 / this.boardDimension) + '%';
    this.handPosition = [
        {x: 9, y: 19},
        {x: 10, y: 19}
    ];
    this.render();
}

Game.prototype.render = function () {
    this.container.innerHTML = '';
    this.makeGameBoardArray();
    this.makeGameBoard();
    this.placeHand();
    this.gameArray.forEach(row => {
        row.forEach(cell => {
            this.renderCell();
        });
    });
};

Game.prototype.makeGameBoardArray = function () {
    this.gameArray = (
        Array(this.boardDimension)
            .fill("x")
            .map(
                row => Array(this.boardDimension).fill("x")
            )
    )
};

Game.prototype.makeGameBoard = function () {
    const gameBoard = document.createElement("div");
    gameBoard.style.width = "500px";
    gameBoard.style.height = "500px";
    gameBoard.style.backgroundColor = "grey";
    gameBoard.style.margin = "0 auto";
    gameBoard.style.display = 'flex';
    gameBoard.style.flexWrap = 'wrap';
    this.gameBoard = gameBoard;
    this.container.appendChild(gameBoard);
};

Game.prototype.renderCell = function () {
    const cell = document.createElement('div');
    cell.style.width = this.cellDimension;
    cell.style.height = this.cellDimension;
    cell.style.border = '1px solid black';
    this.gameBoard.appendChild(cell);
};

Game.prototype.placeHand = function() {
    this.gameArray[this.handPosition[0].x][this.handPosition[0].y] = 'h';
    this.gameArray[this.handPosition[1].x][this.handPosition[1].y] = 'h';
};

Game.prototype.oscarMove = function () {

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
