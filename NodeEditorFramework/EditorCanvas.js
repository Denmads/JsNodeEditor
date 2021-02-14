import Grid from "./Elements/Grid.js";

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

        this.scaleFactor = 1;

        this.setupInput();
    }

    setupInput() {
        this.canvas.addEventListener("wheel", (event) => {
            if (event.deltaY > 0) { //Scroll down on wheel

            }
            else {
                
            }
        });
    }

    scale(newScale) {
        this.scaleFactor = 1/newScale;
        this.context.scale(newScale, newScale);
    }

    redraw() {
        this.context.clearRect(0, 0, this.canvas.width * this.scaleFactor, this.canvas.height * this.scaleFactor);
        this.grid.draw(this.context, this.scaleFactor);
    }
}