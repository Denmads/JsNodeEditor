import Grid from "./Elements/Grid.js";
import Node from "./Elements/Node.js";
import Socket, { SocketType, SocketValueType } from "./Elements/Socket.js";
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
        this.mouseZoomer.worldOrigin.x = -this.canvas.width/2;
        this.mouseZoomer.worldOrigin.y = -this.canvas.height/2;

        this.sck = new Node();
        this.sck.addInputSocket("1", SocketValueType.NUMBER);
        this.sck.addInputSocket("2", SocketValueType.NUMBER);
        this.sck.addInputSocket("3", SocketValueType.BOOLEAN);
        this.sck.addInputSocket("4", SocketValueType.NUMBER);
        this.sck.addInputSocket("5", SocketValueType.NUMBER);
        this.sck.addInputSocket("6", SocketValueType.NUMBER);

        this.sck.calculate();

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

        this.sck.draw(this.context, this.mouseZoomer, 0, 0);   
    }
}