import { Node } from "./Node.js";
export class Label extends Node {

    constructor(text, textStyle, textColor) {
        super();
        this.text = text;
        this.textStyle = {};
        if(textStyle) this.textStyle = textStyle;
        this.textColor = textColor;
        if(textColor) this.textColor = textColor;
    }

    get text() {
        return this._text;
    }
    set text(value) {
        this._text = value;
        this.elm.innerHTML = this._text;
    }

    get textStyle(){
        return this._textStyle;
    }

    set textStyle(value){
        this._textStyle = value;
        this.elm.style.fontSize = this._textStyle + "px";
    }

    get textColor(){
        return this._textColor;
    }

    set textColor(color){
        this._textColor = color;
        this.elm.style.color = this._textColor;
    }
    setText(value){
        this.text = value
    }

    _initElement() {
        this.elm = document.createElement("div");
        this.elm.style.position = "absolute";
    }
}