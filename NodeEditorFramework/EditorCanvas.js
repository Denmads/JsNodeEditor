import Grid from "./Elements/Grid.js";
import Node from "./Elements/Node.js";
import QuadTree from "./Elements/QuadTree.js";
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

        this.canMove = true;

        this.areaSixe = 10000;
        this.nodeContainer = new QuadTree(-this.areaSixe/2, -this.areaSixe/2, this.areaSixe, this.areaSixe, 3);

        this.setupInput();

        this.redraw();
    }

    setupInput() {
        this.canvas.addEventListener("wheel", this.onMouseScroll.bind(this), {passive: false});
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mousedown", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mouseout", this.onMouseMove.bind(this));
    }

    onMouseMove (event) {
        if (this.canMove)
            this.mouseZoomer.onMouseMove(event);
    }

    onMouseScroll (event) {
        this.mouseZoomer.onMouseScroll(event);
    }

    redraw() {
        var self = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.grid.draw(this, this.mouseZoomer);

        let allNodes = this.nodeContainer.getNodesInRegion(-this.areaSixe/2, -this.areaSixe/2, this.areaSixe, this.areaSixe);
        for (let i = 0; i < allNodes.length; i++) {
            let node = allNodes[i];
            node.draw(this.context, this.mouseZoomer, 0, 0);  
        }

        window.requestAnimationFrame(self.redraw.bind(self));
    }
}