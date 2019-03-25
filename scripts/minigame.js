function Game(selector) {
    this.container = document.querySelector(selector);
    this.oscarAmount = 100;
    this.gameArray = [];
    this.oscars = [];
    this.gameTick = 500;
    this.score = 0;
    this.delay = -3;
    this.gameBoard = null;
    this.boardDimension = 20;
    this.cellDimension = (100 / this.boardDimension) + '%';
    this.handPosition = [
        { x: 9, y: 19 },
        { x: 10, y: 19 }
    ];

    this.init();
}

Game.prototype.init = function () {
    this.oscars = this.makeOscarsArray();
    this.render();
    this.startGame();
};

Game.prototype.render = function () {
    this.container.innerHTML = '';

    this.makeFieldWithScore();
    this.makeGameBoardArray();
    this.makeGameBoard();
    this.placeHand();
    this.renderOscar();
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
    );
};

Game.prototype.makeFieldWithScore = function () {
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
    cellEl.style.textAlign = "center";
    if (cell === "h") {
        cellEl.style.backgroundColor = "black";
    }
    if (cell === "o") {
        cellEl.innerHTML = "<img src='./images/oscar.png'/>";
    }
    this.gameBoard.appendChild(cellEl);
};

Game.prototype.placeHand = function () {
    this.gameArray[this.handPosition[0].y][this.handPosition[0].x] = 'h';
    this.gameArray[this.handPosition[1].y][this.handPosition[1].x] = 'h';
};

Game.prototype.makeOscarsArray = function () {
    this.oscars = (new Array(this.oscarAmount))
        .fill(1)
        .map(() => ({
            x: Math.floor(Math.random() * 20),
            y: -1,
        }));
    for (let i = 1; i < this.oscars.length; i++) {
        this.oscars[i].y = this.oscars[i - 1].y + this.delay;
    }
    return this.oscars;
};

Game.prototype.renderOscar = function () {
    this.oscars.forEach(oscar => {
        if (
            this.gameArray[oscar.y] &&
            this.gameArray[oscar.y][oscar.x]
        ) {
            this.gameArray[oscar.y][oscar.x] = 'o';
        }
    });
};

Game.prototype.oscarsMove = function () {
    for (let i = 0; i < this.oscars.length; i++) {
        this.oscars[i].y = this.oscars[i].y + 1;
    }
    return this.oscars;
};

Game.prototype.oscarsInterval = function () {
    setInterval(() => {
        this.oscarsMove();
        this.render();
    } , this.gameTick);
};

Game.prototype.startGame = function () {
    window.addEventListener(
        'keypress',
        (event) => {
            if (event.key === "Enter") this.oscarsInterval();
        }
    );
};

Game.prototype.handMove = function () {
};

Game.prototype.checkIfOscarWasCaught = function () {

};

Game.prototype.endGame = function () {

};
