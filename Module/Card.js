import { Label } from "../Lib/Label.js";
import { Node } from "../Lib/Node.js";
import { Sprite } from "../Lib/Sprite.js";


export class Card extends Node {
    constructor(src, index, value) {
        super();
        this._src = src;
        this._index = index;
        if (index) this._index = index;
        this._value = value;
        if (value) this._value = value;
        this._isFlip = false;
        this._width = 150;
        this._height = 150;
        this._iniImg();
        this._initCover();
        this._initIndex();
    }

    get src() {
        return this._src;
    }

    set src(val) {
        this._src = val;
    }

    get isFlip() {
        return this._isFlip;
    }

    set isFlip(value) {
        this._isFlip = value;
    }

    _initCover() {
        var cover = new Sprite("../img/cover.jpeg");
        cover.width = 200;
        cover.height = 200;
        cover.elm.node = this;
        this.addChild(cover);
    }


    _iniImg() {
        var img = new Sprite(this.src);
        img.width = 180;
        img.height = 200;
        this.addChild(img);
    }

    _initIndex() {
        var cardIndex = new Label(this._index, 70, "White");
        cardIndex.elm.node = this;
        if(this._index < 10){
            cardIndex.x = 83;
            cardIndex.y = 60;
        }
        if(this._index >= 10){
            cardIndex.x = 70;
            cardIndex.y = 60;
        }
        this.addChild(cardIndex);
    }
}
