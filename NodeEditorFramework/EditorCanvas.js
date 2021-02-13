export default class EditorCanvas {
    constructor(parent, style) {
        this.canvas = document.createElement("canvas");
        this.canvas.style.height = parent.clientHeight + "px";
        this.canvas.style.width = Math.floor(parent.clientWidth * 0.7) + "px";
        parent.appendChild(this.canvas);
    }
}