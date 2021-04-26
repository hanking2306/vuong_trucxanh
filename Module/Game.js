import { Sprite } from "../Lib/Sprite.js";
import { Node } from "../Lib/Node.js"
import { Card } from "./Card.js";
import { Label } from "../Lib/Label.js";

var listCard = [];
var clickSound = new Audio("../img/click.mp3");
for (let i = 0; i < 10; i++) {
    listCard.push({
        src: "../img/pokemon" + i + ".png",
        value: i,
        available: 2,
    })
}

export class Game extends Node {
    init() {
        this._elementBackground();
        this._initStartGame();
        this.countClick = 0;
        this.arrValue = [];
        this.firstClick = null;
        this.secondClick = null;
        this._score = 1000;
        this._math = 0;
        this._isClick = false;
    }
    _elementBackground() {
        const bg = new Sprite("../img/trucxanh_bg.jpg");
        bg.width = 1650;
        bg.height = 950;
        this.addChild(bg);
    }

    get score() {
        return this._score;
    }

    set score(val) {
        let obj = {
            value: this._score
        }
        TweenLite.to(obj, 0.3, {
            value: val,
            roundProps: {
                value: 10
            },
            onUpdate: () => {
                this._score = obj.value;
                this.children[2].text = this._score;
            },
            onComplete: ()=> {
                this._elementGameOver();
            }
        })
    }

    get math() {
        return this._math;
    }

    set math(value) {
        this._math = value;
        this._math = this._math;
    }

    _elementCard() {
        let arrRandom = [];
        let index = 1;
        let linetime = gsap.timeline();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 5; j++) {
                do {
                    var randomCard = Math.floor(Math.random() * listCard.length);
                    arrRandom.push(randomCard);
                } while (listCard[randomCard].available == 0) {
                    listCard[randomCard].available--;
                }
                const card = new Card(listCard[randomCard].src, index, listCard[randomCard].value);
                card.x = 720;
                card.y = 370;
                card.zIndex = 99;
                linetime.to(card, {duration: 0.4, ease: "back.out(4)", x: j * 200 + 320, y: i * 200 + 70, zIndex:  20 - index});
                this.addChild(card);
                index++;
                card.onClick("mousedown", this.onClickCard.bind(this));
            }
        }
        new Promise(resolve => setTimeout(resolve, 6000)).then(()=>{
            this._isClick = true;
        }); 
    }

    onClickCard(evt) {
        let card = evt.target.node;
        const flipSound = new Audio("../img/flip.mp3");
        clickSound.play();
        const failChoose = new Audio("../img/bruh.mp3");
        const rightChoose = new Audio("../img/wow.mp3");
        if (this.countClick === 0 && card.isFlip === false && this._isClick === true) {
            this.countClick++;
            this.firstClick = card;
            this.firstClick.isFlip = true;
            card.children[0].scaleX = 0;
            this.flipOpen(card.children[1], card.children[0], card.children[2]);
            flipSound.play();
        }
        else if (this.countClick === 1 && card.isFlip === false && this._isClick === true) {
            this.countClick++;
            this.secondClick = card;
            this.secondClick.isFlip = true;
            card.children[0].scaleX = 0;
            this.flipOpen(card.children[1], card.children[0], card.children[2]);
            flipSound.play();
            if (this.firstClick._value === this.secondClick._value) {
                gsap.to(this.firstClick.children[0], { duration: 1, opacity: 0, scale: 2, delay: 0.5 });
                gsap.to(this.secondClick.children[0], { duration: 1, opacity: 0, scale: 2, delay: 0.5 });
                setTimeout(() => {
                    this.score += 50;
                    rightChoose.play();
                    this.reSetup(this.firstClick, this.secondClick);
                    this.math++;
                }, 500);
            }
            else {
                this.flipClose(this.firstClick.children[1], this.firstClick.children[0], this.firstClick.children[2]);
                this.flipClose(this.secondClick.children[1], this.secondClick.children[0], this.secondClick.children[2]);
                setTimeout(() => {
                    this.score -= 100;
                    failChoose.play();
                    this.reSetup(this.firstClick, this.secondClick);
                }, 500);
            }
        } else {
            return;
        }
    }

    flipOpen(card1, card2, card3) {
        let linetime = gsap.timeline();
        gsap.to(card3, { duration: 0.2, scaleX: 0 });
        linetime.to(card1, { duration: 0.2, scaleX: 0 });
        linetime.to(card2, { duration: 0.2, scaleX: 1 });
    }

    flipClose(card1, card2, card3) {
        gsap.to(card1, { duration: 0.3, scaleX: 1, delay: 0.75 });
        gsap.to(card2, { duration: 0.3, scaleX: 0, delay: 0.75 });
        gsap.to(card3, { duration: 0.2, scaleX: 1, delay: 0.75 });
    }

    reSetup(card1, card2) {
        card1.isFlip = false;
        card2.isFlip = false;
        this._isClick = true; 
        this.countClick = 0;
    }

    _elementScore() {
        const textScore = new Label("Score", 70, "Black");
        textScore.x = 70;
        textScore.y = 300;
        this.addChild(textScore);
    }

    _elementCountScore() {
        const countScore = new Label(this.score, 70, "Black");
        countScore.x = 80;
        countScore.y = 400;
        this.addChild(countScore);
    }
    
    _initStartGame() {
        const startGame = new Sprite("../img/StartGame.png");
        this.setUpSprite(startGame, 350, 100, 900, 750, true);
        this.addChild(startGame);
        startGame.onClick("mousedown", this.onPlayGame.bind(this));
    }
    
    onPlayGame(evt) {
        const đivineCarđ = new Audio("../img/phatbai.mp3");
        đivineCarđ.play();
        evt.target.style.display = 'none';
        this._elementCountScore();
        this._elementScore();
        this._elementCard();
        this._elementGameOver();
        this._initRestartGame();
    }
    
    _elementGameOver() {
        const gameOver = new Sprite("../img/game-over.jpeg");
        const loseMusic = new Audio("../img/tf_nemesis.mp3");
        this.setUpSprite(gameOver, 350, 90, 950, 750, false);
        this.addChild(gameOver);
        if (this.score <= 0) {
            gameOver.active = true;
            for (let i = 1; i < 26; i++) {
                this.children[i].active = false;
            }
            loseMusic.play();
        }
        const winner = new Sprite("../img/winner.jpeg");
        const winMusic = new Audio("../img/win.mp3");
        this.setUpSprite(winner, 525, 200, 600, 400, false);
        this.addChild(winner);
        if (this._math === 10) {
            winner.active = true;
            winMusic.play();
        }
    }

    _initRestartGame() {
        const reStartGame = new Sprite("../img/replay.png");
        this.setUpSprite(reStartGame, 1400, 350, 200, 200, true);
        this.addChild(reStartGame);
        reStartGame.onClick("mousedown", this.onRePlayGame.bind(this));
    }

    onRePlayGame(evt) {
        clickSound.play();
        location.reload();
    }
    
    setUpSprite(sprite, left, top, width, height, active){
        sprite.x = left;
        sprite.y = top;
        sprite.width = width;
        sprite.height = height;
        sprite.active = active;
    }
}