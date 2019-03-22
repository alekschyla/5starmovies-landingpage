function Game(selector) {
    this.container = document.querySelector(selector);
    this.gameArray = [];
    this.score = 0;
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
    this.makeFieldWithScore();
    this.makeGameBoardArray();
    this.makeGameBoard();
    this.placeHand();
    this.gameArray.forEach(row => {
        row.forEach(cell => {
            this.renderCell(cell);
        });
    });
};

Game.prototype.makeGameBoardArray = function () {
    this.gameArray = (
        Array(this.boardDimension)
            .fill("x")
            .map(
                () => Array(this.boardDimension).fill("x")
            )
    )
};

Game.prototype.makeFieldWithScore = function() {
    const div = document.createElement("div");
    div.style.width = "500px";
    div.style.backgroundColor = "black";
    div.style.color = "white";
    div.style.margin = "0 auto";
    div.style.textAlign = "center";
    div.innerText = `Score: ${this.score}`;
    this.container.appendChild(div);
};

Game.prototype.makeGameBoard = function () {
    const gameBoard = document.createElement("div");
    gameBoard.style.width = "500px";
    gameBoard.style.height = "800px";
    gameBoard.style.backgroundColor = "grey";
    gameBoard.style.margin = "0 auto";
    gameBoard.style.display = 'flex';
    gameBoard.style.flexWrap = 'wrap';
    this.gameBoard = gameBoard;
    this.container.appendChild(gameBoard);
};

Game.prototype.renderCell = function (cell) {
    const cellEl = document.createElement('div');
    cellEl.style.width = this.cellDimension;
    cellEl.style.height = this.cellDimension;
    cellEl.style.border = '1px solid black';
    if (cell === "h") {
        cellEl.style.backgroundColor = "red";
    }
    this.gameBoard.appendChild(cellEl);
};

Game.prototype.placeHand = function () {
    this.gameArray[this.handPosition[0].y][this.handPosition[0].x] = 'h';
    this.gameArray[this.handPosition[1].y][this.handPosition[1].x] = 'h';
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
