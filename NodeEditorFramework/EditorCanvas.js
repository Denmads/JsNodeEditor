import CanvasStateMachine, { CanvasState } from "./CanvasStateMachine.js";
import Grid from "./Elements/Grid.js";
import Point from "./Elements/Mathematical/Point.js";
import Rect from "./Elements/Mathematical/Rect.js";
import QuadTree from "./Elements/QuadTree.js";
import ValueType from "./Elements/ValueType.js";
import CornerWireSection from "./Elements/Wire/Sections/CornerWireSection.js";
import StraightWireSection from "./Elements/Wire/Sections/StraightWireSection.js";
import MouseZoomer from "./MouseZoomer.js";

export default class EditorCanvas {
    constructor(parent, style, propertiesPanel) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        this.canvas.style.position = "absolute";
        parent.insertBefore(this.canvas, parent.children[0]);

        this.context = this.canvas.getContext("2d");
        this.context.imageSmoothingEnabled = false;

        this.grid = new Grid(style);
        this.mouseZoomer = new MouseZoomer(this);
        this.mouseZoomer.worldOrigin.x = -this.canvas.width/2;
        this.mouseZoomer.worldOrigin.y = -this.canvas.height/2;

        this.canMove = true;

        this.areaSize = 10000;
        this.nodeContainer = new QuadTree(-this.areaSize/2, -this.areaSzxe/2, this.areaSize, this.areaSize, 3);

        this.stateMachine = new CanvasStateMachine(this, propertiesPanel);

        this.hoveredNode = undefined;
        this.selectedNode = undefined;

        this.setupInput();


        //DEBUG
        this.section = new CornerWireSection(ValueType.STRING, new Point(0, 0), new Point(100, 100), 2, new Point(100, 0));

        this.redraw();
    }

    setupInput() {
        this.canvas.addEventListener("wheel", this.onMouseScroll.bind(this), {passive: false});
        
        this.canvas.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        })
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
            
            node.resetError();
            node.update();
            if (node.error == undefined) {
                node.onNoUpdateError();
            }
            else {
                node.onUpdateError();
            }

            node.draw(self.context, self.mouseZoomer, 0, 0);  
        }

        self.section.drawHighlight(self.context, self.mouseZoomer, "#e6d64c");
        self.section.draw(self.context, self.mouseZoomer);
        if (self.section.containsPoint(self.mouseZoomer.screenToWorldX(self.mouseZoomer.mouse.live.x), self.mouseZoomer.screenToWorldY(self.mouseZoomer.mouse.live.y))) {
            console.log("inside");
        }

        window.requestAnimationFrame(self.redraw.bind(self));
    }
}