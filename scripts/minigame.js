function Game(selector) {
    this.container = document.querySelector(selector) || document.body;

    this.init();
}

Game.prototype.init = function () {
    this.setInitialState();
    this.render();
    this.startListeningArrowKeys();
    this.startGame();
};

Game.prototype.setInitialState = function () {
    this.oscarAmount = 5;
    this.gameArray = [];
    this.oscars = [];
    this.gameTick = 500;
    this.gameIntervalId = null;
    this.score = 0;
    this.delay = -3;
    this.gameBoard = null;
    this.boardDimension = 20;
    this.cellDimension = (100 / this.boardDimension) + '%';
    this.handPosition = [
        { x: 9, y: 19 },
        { x: 10, y: 19 }
    ];
    
    this.oscars = this.makeOscarsArray();
};

Game.prototype.render = function () {

    this.makeGameContainer();
    this.makeFieldWithGameInstructions();
    this.makeFieldWithHighScores();
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
    this.endGame();
};

Game.prototype.makeGameContainer = function () {
    this.container.innerHTML = '';

    const mainDiv = document.createElement('div');
    const leftDiv = document.createElement('div');
    const middleDiv = document.createElement('div');
    const rightDiv = document.createElement('div');

    mainDiv.className = 'game-container';
    leftDiv.className = 'left-container';
    middleDiv.className = 'middle-container';
    rightDiv.className = 'right-container';

    this.container.appendChild(mainDiv);
    mainDiv.appendChild(leftDiv);
    mainDiv.appendChild(middleDiv);
    mainDiv.appendChild(rightDiv);
};

Game.prototype.makeFieldWithGameInstructions = function () {
    const instructionsDiv = document.createElement('div');
    instructionsDiv.innerText = 'Instrukcja do gry';
    document.querySelector('.left-container').appendChild(instructionsDiv);
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

Game.prototype.makeFieldToSaveUserNameAndScore = function () {
    const nameInput = document.createElement('input');
    const nameButton = document.createElement('button');
    document.querySelector('.right-container').appendChild(nameInput);
    document.querySelector('.right-container').appendChild(nameButton);
    nameInput.setAttribute('placeholder', 'Podaj swoje imię lub ksywkę');
    nameButton.innerText = "Zapisz";

    nameButton.addEventListener(
        'click',
        () => {
            const valueFromInput = nameInput.value;
            if (valueFromInput) {
                this.saveScore(valueFromInput, this.score);
                location.reload(true);
            }
        }
    );
};

Game.prototype.makeFieldWithHighScores = function () {
    const div = document.createElement("div");
    const list = document.createElement('ol');
    div.className = 'high-scores';
    list.className = 'high-scores__list';
    div.innerText = "Najlepsze wyniki:";
    document.querySelector('.right-container').appendChild(div);
    div.appendChild(list);

    const highestScores = this.loadScores();
    for (let i = 0; i < highestScores.length; i++) {
        list.innerHTML += `<li>${highestScores[i].name} ${highestScores[i].score}</li>`;
    }
};

Game.prototype.makeFieldWithScore = function () {
    const div = document.createElement("div");
    div.className = 'user-score-field';
    div.innerText = `Twój wynik: ${this.score}`;
    document.querySelector('.middle-container').appendChild(div);
};

Game.prototype.makeGameBoard = function () {
    const gameBoard = document.createElement("div");
    gameBoard.className = 'game-board';
    this.gameBoard = gameBoard;
    document.querySelector('.middle-container').appendChild(gameBoard);
};

Game.prototype.startListeningArrowKeys = function () {
    window.addEventListener(
        'keydown',
        event => {
            switch (event.key) {
                case 'ArrowLeft':
                    event.preventDefault();
                    this.moveLeft();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    this.moveRight();
                    break;
            }
        }
    );
};

Game.prototype.moveRight = function () {

    if (this.handPosition[0].x < 18) {
        this.handPosition = [
            { x: this.handPosition[0].x + 1, y: 19 },
            { x: this.handPosition[1].x + 1, y: 19 }
        ];
    }
    this.checkIfOscarWasCaught();
    this.render();
};

Game.prototype.moveLeft = function () {

    if (this.handPosition[0].x > 0) {
        this.handPosition = [
            { x: this.handPosition[0].x - 1, y: 19 },
            { x: this.handPosition[1].x - 1, y: 19 }
        ];
    }
    this.checkIfOscarWasCaught();
    this.render();
};

Game.prototype.renderCell = function (cell) {
    const cellEl = document.createElement('div');
    cellEl.className = 'game-board-cell';
    cellEl.style.width = this.cellDimension;
    cellEl.style.height = this.cellDimension;
    if (cell === "h") {
        cellEl.style.backgroundColor = "#342A21";
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
            x: Math.floor(Math.random() * this.boardDimension),
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
    this.gameIntervalId = setInterval(() => {
        this.oscarsMove();
        this.checkIfOscarWasCaught();
        this.render();
    }, this.gameTick);
};

Game.prototype.startGame = function () {
    window.addEventListener(
        'keypress',
        (event) => {
            if (event.key === "Enter") this.oscarsInterval();
        }
    );
};

Game.prototype.loadScores = function () {
    return JSON.parse(localStorage.getItem('scores')) || [];
};

Game.prototype.saveScore = function (valueFromInput, score) {
    const currentScores = this.loadScores();

    const newScores = currentScores.concat({ name: valueFromInput, score: score })
        .sort((a, b) => (b.score > a.score) ? 1 : (a.score === b.score) ? ((a.name > b.name) ? 1 : -1) : -1)
        .filter((el, index) => index < 10);

    localStorage.setItem('scores', JSON.stringify(newScores));
};

Game.prototype.checkIfOscarWasCaught = function () {
    this.oscars.forEach((element) => {
        if ((element.x === this.handPosition[0].x && element.y === this.handPosition[0].y) || (element.x === this.handPosition[1].x && element.y === this.handPosition[1].y)) {
            this.score += 1;
            element.y = this.boardDimension;
        }
    });
};

Game.prototype.endGame = function () {
    if (this.checkIfOscarsFell()) {
        window.clearInterval(this.gameIntervalId);
        this.makeFieldToSaveUserNameAndScore();
    }
};

Game.prototype.checkIfOscarsFell = function () {
    let ifOscarsFell = true;
    for (let i = 0; i < this.oscars.length; i++) {
        if (this.oscars[i].y < this.boardDimension) {
            ifOscarsFell = false;
        }
    }
    return ifOscarsFell;
};