class Game {
    constructor() {
        this._player1 = [];
        this._player2 = [];
        this._player1Points = 0;
        this._player2Points = 0;
        this._flag = true;
    }
    addPoint(field) {
        if (field.className === "game__el game__icon--cross" || field.className === "game__el game__icon--circle") return
        if (this._flag) {
            field.classList.add("game__icon--circle");
            this._flag = !this._flag;
            this._player1.push(field.dataset.order)
        } else {
            field.classList.add("game__icon--cross");
            this._flag = !this._flag;
            this._player2.push(field.dataset.order)
        }
    }
    checkWinner(field, player1, player2) {
        const winningFields = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 8],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        winningFields.forEach(winningSet => {
            let player1Points = 0;
            let player2Points = 0
            let takenFields = 0
            field.forEach(field => {
                if (field.className === "game__el game__icon--cross" || field.className === "game__el game__icon--circle") takenFields++
            })
            winningSet.forEach(i => {
                if (field[i].className === "game__el game__icon--circle") player1Points++
                if (field[i].className === "game__el game__icon--cross") player2Points++
            })
            if (player1Points === 3) {
                this._player1Points++;
                player1.textContent = this._player1Points;
                this.resetGame(field)
            } else if (player2Points === 3) {
                this._player2Points++;
                player2.textContent = this._player2Points
                this.resetGame(field)
            } else if (takenFields === 9) {
                this.resetGame(field)
            }
        })

    }
    resetGame(fields) {
        this._player1 = [];
        this._player2 = [];
        this._flag = true;
        fields.forEach(field => {
            field.className = "game__el"
        })
    }
}
const game = new Game
const gameField = document.querySelectorAll(".game__el")
const result1 = document.querySelectorAll(".header__result")[0]
const result2 = document.querySelectorAll(".header__result")[1]
const resetBtn = document.querySelector(".reset-btn")

gameField.forEach(field => {
    field.addEventListener('click', () => {
        game.addPoint(field);
        game.checkWinner(gameField, result1, result2)
    })
})