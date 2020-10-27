const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
let {move,fair} = yargs(hideBin(process.argv)).argv
if (!move) {
    console.error("You must use the --move option to play: rps --move=rock")
    return -1;
}
class Game {
    constructor(PlayerMove,ComputerMove,fair) {
        this.move1 = PlayerMove;
        this.move2 = ComputerMove;
        if (!fair) {
            this.rig();
        }
        
    }
    play() {
        console.log(`Player played ${this.move1.toString()}`);
        console.log(`Computer played ${this.move2.toString()}`);
        let winner='Computer'
        if (this.move1.canBeat(this.move2)) {
            winner='Player'
        }else if(this.move2.canBeat(this.move1)) {
            winner='Computer'
        }else{
            console.log ('~Tie game!~')
            return;
        }
        console.log(`~${winner} wins.~`);
    }
    rig() {
        let riggedPlay = this.move1.id+1;
        if (riggedPlay > Move.allMoves.length-1) {
            riggedPlay = 0;
        }
        this.move2 = new Move(riggedPlay);
    }
}
class Move {
    static allMoves=["rock","paper","scissors"];
    
    constructor(move) {
        if (typeof move === 'string') {
            this.id = Move.getMoveId(move);
        }else{
            this.id = move;
        }
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    canBeat(move) {
        if (move instanceof Move) {
            return this.canBeatById(move.id);
        }else if(typeof move === 'string') {
            return this.canBeatByString(move);
        }else if(typeof move === 'number') {
            return this.canBeatById(move);
        }
        return false;
    }
    canBeatById(moveId) {
        return (this.id>0)?this.id-1===moveId:moveId===Move.allMoves.length-1;
    }
    canBeatByString(string) {
        this.canBeatById(Move.getMoveId(string));
    }
    nextMove() {
        this.id++;
        if (this.id > Move.allMoves.length-1) {
            this.id=0;
        }
    }
    static getMoveId(string) {
        let moveId = Move.allMoves.indexOf(string);
        return (moveId<-1)?0:moveId;
    }
    static fromRandom() {
        let val = Math.random()*(Move.allMoves.length);
        val = Math.floor(val);
        if (val > Move.allMoves.length-1) { // unnecessary probably
            val = 0;
        }
        return new Move(val);
    }
    toString() {
        return Move.allMoves[this.id];
    }
}

move=move.toLowerCase();
let playerMove = new Move(move);
let computerMove = Move.fromRandom();
let game = new Game(playerMove,computerMove,fair);
game.play();
