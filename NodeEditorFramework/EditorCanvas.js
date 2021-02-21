import CanvasStateMachine, { CanvasState } from "./CanvasStateMachine.js";
import Grid from "./Elements/Grid.js";
import Rect from "./Elements/Mathematical/Rect.js";
import QuadTree from "./Elements/QuadTree.js";
import MouseZoomer from "./MouseZoomer.js";
import Node from "./Elements/Node.js";

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

        this.stateMachine = new CanvasStateMachine(this);

        this.hoveredNode = undefined;
        this.selectedNode = undefined;

        this.setupInput();

        this.redraw();
    }

    setupInput() {
        this.canvas.addEventListener("wheel", this.onMouseScroll.bind(this), {passive: false});
        
        this.canvas.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
    }

    onMouseMove (event) {
        let canvasBound = event.target.getBoundingClientRect();
        let x = this.mouseZoomer.screenToWorldX(event.clientX - canvasBound.left);
        let y = this.mouseZoomer.screenToWorldY(event.clientY - canvasBound.top);

        let hoveringNode = undefined;
        let region = new Rect(x - this.mouseZoomer.zoomedInv(500), y - this.mouseZoomer.zoomedInv(500), this.mouseZoomer.zoomedInv(1000), this.mouseZoomer.zoomedInv(1000));
        let allNodes = this.nodeContainer.getNodesInRegion(region);
        for (let node of allNodes) {
            if (node.boundary.contains(x, y)) {
                hoveringNode = node;
            }
        }

        if (event.type == "mouseup") {
            this.mouseZoomer.onMouseMove(event);
        }

        if (hoveringNode != undefined) {
            hoveringNode.onHover();
        }

        if (hoveringNode != undefined && this.hoveredNode == undefined && hoveringNode != this.selectedNode) {
            hoveringNode.onHoverStart();
        }
        else if (hoveringNode == undefined && this.hoveredNode != undefined && this.hoveredNode != this.selectedNode) {
            this.hoveredNode.onHoverEnd();
        }
        else if (hoveringNode != this.hoveredNode) {
            this.hoveredNode.onHoverEnd();
            this.hoveredNode.onHoverStart();
        }
        

        if (this.stateMachine.state == CanvasState.DEFAULT && event.type == "mouseup" && event.button == 2) {
            if (hoveringNode != undefined)
                hoveringNode.onRightClick();
        }
        else if (this.stateMachine.state == CanvasState.DEFAULT && event.type == "mouseup" && event.button == 0) {
            if (hoveringNode != undefined) {
                if (this.selectedNode != undefined) {
                    this.selectedNode.onDeselect();
                }
                this.selectedNode = hoveringNode;
                this.selectedNode.onSelect();
            }
            else {
                this.selectedNode.onDeselect();
                this.selectedNode = undefined;
            }
        }
        else if (this.stateMachine.state == CanvasState.DEFAULT) {
            this.mouseZoomer.onMouseMove(event);
        }
        else if (event.type == "mousedown" && this.stateMachine.state == CanvasState.PLACING) {
            if (event.button == 0) {
                
                let canvasBound = event.target.getBoundingClientRect();
                let x = this.mouseZoomer.screenToWorldX(event.clientX - canvasBound.left);
                let y = this.mouseZoomer.screenToWorldY(event.clientY - canvasBound.top);
                let newNode = new this.stateMachine.placing_node(x, y);
                newNode.calculate();
                this.nodeContainer.addNode(newNode);
            }
            else if (this.stateMachine.state == CanvasState.PLACING && event.button == 2) {
                this.stateMachine.state = CanvasState.DEFAULT;
            }
        }

        //Update hovered node
        this.hoveredNode = hoveringNode;

        event.preventDefault();
    }

    onMouseScroll (event) {
        this.mouseZoomer.onMouseScroll(event);

        event.preventDefault();
    }

    redraw() {
        var self = this;
        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.grid.draw(self, self.mouseZoomer);

        let region = new Rect(self.mouseZoomer.screenToWorldX(-200), self.mouseZoomer.screenToWorldY(-200), self.mouseZoomer.zoomedInv(this.canvas.width + 200), self.mouseZoomer.zoomedInv(this.canvas.height + 200));
        let allNodes = self.nodeContainer.getNodesInRegion(region);
        for (let i = 0; i < allNodes.length; i++) {
            let node = allNodes[i];
            node.draw(self.context, self.mouseZoomer, 0, 0);  
        }

        window.requestAnimationFrame(self.redraw.bind(self));
    }
}