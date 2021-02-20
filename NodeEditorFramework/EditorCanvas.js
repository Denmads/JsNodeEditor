import CanvasStateMachine, { CanvasState } from "./CanvasStateMachine.js";
import Grid from "./Elements/Grid.js";
import Rect from "./Elements/Mathematical/Rect.js";
import QuadTree from "./Elements/QuadTree.js";
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

        this.areaSize = 10000;
        this.nodeContainer = new QuadTree(-this.areaSize/2, -this.areaSzxe/2, this.areaSize, this.areaSize, 3);

        this.stateMachine = new CanvasStateMachine();

        this.setupInput();

        this.redraw();
    }

    setupInput() {
        this.canvas.addEventListener("wheel", this.onMouseScroll.bind(this), {passive: false});
        this.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mousedown", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseMove.bind(this));
        this.canvas.addEventListener("mouseout", this.onMouseMove.bind(this));
        this.canvas.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
    }

    onMouseMove (event) {
        if (this.stateMachine.state == CanvasState.DEFAULT)
            this.mouseZoomer.onMouseMove(event);
        else if (event.type == "mousedown" && this.stateMachine.state == CanvasState.PLACING) {
            if (event.button == 0) {
                let newNode = {};
                Object.defineProperties(newNode, this.stateMachine.placing_node);

                let canvasBound = event.target.getBoundingClientRect();
                newNode.boundary.position.x = this.mouseZoomer.screenToWorldX(event.clientX - canvasBound.left);
                newNode.boundary.position.y = this.mouseZoomer.screenToWorldY(event.clientY - canvasBound.top);
                newNode.calculate();
                console.log(newNode);
                this.nodeContainer.addNode(newNode);
            }
            else if (event.button == 2) {
                this.stateMachine.state = CanvasState.DEFAULT;
            }
        }

        event.preventDefault();
    }

    onMouseScroll (event) {
        this.mouseZoomer.onMouseScroll(event);

        event.preventDefault();
    }

    redraw() {
        var self = this;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.grid.draw(this, this.mouseZoomer);

        let region = new Rect(this.mouseZoomer.screenToWorldX(-100), this.mouseZoomer.screenToWorldY(-100), this.mouseZoomer.zoomedInv(this.canvas.width + 100), this.mouseZoomer.zoomedInv(this.canvas.height + 100));
        let allNodes = this.nodeContainer.getNodesInRegion(region);
        for (let i = 0; i < allNodes.length; i++) {
            let node = allNodes[i];
            node.draw(this.context, this.mouseZoomer, 0, 0);  
        }

        window.requestAnimationFrame(self.redraw.bind(self));
    }
}