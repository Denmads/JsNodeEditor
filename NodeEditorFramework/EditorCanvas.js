import Grid from "./Elements/Grid.js";
import MouseZoomer from "./MouseZoomer.js";

export default class EditorCanvas {
    constructor(parent, style) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        this.canvas.style.position = "absolute";
        parent.appendChild(this.canvas);

        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;

        this.grid = new Grid(style);
        this.mouseZoomer = new MouseZoomer(this);

        this.setupInput();
    }

    setupInput() {
        this.canvas.addEventListener("wheel", this.onMouseScroll.bind(this), {passive: false});
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mousedown", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mouseout", this.onMouseMove.bind(this));
    }

    onMouseMove (event) {
        this.mouseZoomer.onMouseMove(event);
        this.redraw();
    }

    onMouseScroll (event) {
        this.mouseZoomer.onMouseScroll(event);
        this.redraw();
    }

    redraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.grid.draw(this, this.mouseZoomer);
    }
}