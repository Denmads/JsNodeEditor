import Rect from "./Elements/Mathematical/Rect.js";

export const CanvasState = {
    DEFAULT: "default",
    PLACING: "placing",
    MOVING_NODE: "move_node",
    CREATING_WIRE: "creating_wire"
}

export default class CanvasStateMachine {
    constructor(editorCanvas, propertiesPanel) {
        this.editorCanvas = editorCanvas;
        this.propertiesPanel = propertiesPanel;

        this.state = CanvasState.DEFAULT;
        this.placing_node = undefined;

        this.hoveringNode = undefined;
        this.selectedNode = undefined;

        this.buttons = [0, 0, 0]
        this.prevMouseWorldPos = {
            x: 0,
            y: 0
        }

        this.editorCanvas.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));
        this.editorCanvas.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.editorCanvas.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.editorCanvas.canvas.addEventListener("mouseout", this.onMouseOut.bind(this));
    }

    getMouseWorldPos(event) {
        let canvasBound = event.target.getBoundingClientRect();
        let pos = {}
        pos.x = this.editorCanvas.mouseZoomer.screenToWorldX(event.clientX - canvasBound.left);
        pos.y = this.editorCanvas.mouseZoomer.screenToWorldY(event.clientY - canvasBound.top);
        return pos;
    }

    findHoveredNode(mouseWorldPos) {
        let hoveringNode = undefined;
        let region = new Rect(mouseWorldPos.x - this.editorCanvas.mouseZoomer.zoomedInv(500), mouseWorldPos.y - this.editorCanvas.mouseZoomer.zoomedInv(500), this.editorCanvas.mouseZoomer.zoomedInv(1000), this.editorCanvas.mouseZoomer.zoomedInv(1000));
        let allNodes = this.editorCanvas.nodeContainer.getNodesInRegion(region);
        for (let node of allNodes) {
            if (node.boundary.contains(mouseWorldPos.x, mouseWorldPos.y)) {
                hoveringNode = node;
            }
        }
        return hoveringNode;
    }

    isButton(event, button) {
        return event.button == button;
    }

    isHovering() {
        return this.hoveringNode != undefined;
    }

    nodeIsSelected() {
        return this.selectedNode != undefined;
    }

    onMouseDown(event) {
        this.buttons[event.button] = 1;

        let mouseWorldPos = this.getMouseWorldPos(event);

        switch (this.state) {
            case CanvasState.DEFAULT:
                if (this.isButton(event, 0)) {

                    if (this.selectedNode != undefined && this.selectedNode == this.hoveringNode) {
                        this.state = CanvasState.MOVING_NODE;
                    }
                    else if (this.hoveringNode != undefined) {
                        if (this.selectedNode != undefined) {
                            this.selectedNode.onDeselect();
                        }
                        this.selectedNode = this.hoveringNode;
                        this.selectedNode.onSelect();
                        this.propertiesPanel.setNode(this.selectedNode);
                    }
                    else if (this.selectedNode != undefined) {
                        this.selectedNode.onDeselect();
                        this.selectedNode = undefined;
                        this.propertiesPanel.setNode(undefined);
                    }
                    else {
                        this.editorCanvas.mouseZoomer.onMouseDown();
                    }
                }
                else if (this.isButton(event, 2)) {
                    if (this.hoveringNode != undefined)
                    this.hoveringNode.onRightClick();
                }

                break;
            case CanvasState.PLACING:
                if (this.isButton(event, 0)) {
                    let newNode = new this.placing_node(mouseWorldPos.x, mouseWorldPos.y);
                    newNode.calculate();
                    this.editorCanvas.nodeContainer.addNode(newNode);
                }
                else if (this.isButton(event, 2)) {
                    this.state = CanvasState.DEFAULT;
                }
                break;
        }
    }

    onMouseUp(event) {
        this.editorCanvas.mouseZoomer.onMouseUpOrOut();
        this.buttons[event.button] = 0;

        switch (this.state) {
            case CanvasState.MOVING_NODE:
                this.state = CanvasState.DEFAULT;
                break;
        }
    }

    onMouseOut(event) {
        this.editorCanvas.mouseZoomer.onMouseUpOrOut();
    }

    onMouseMove(event) {
        let mouseWorldPos = this.getMouseWorldPos(event);
        let hoveringNode = this.findHoveredNode(mouseWorldPos);

        

        switch (this.state) {
            case CanvasState.DEFAULT:
                if (hoveringNode != this.hoveringNode) {
                    if (hoveringNode != undefined) {
                        hoveringNode.onHoverStart();
                    }
                    if (this.hoveringNode != undefined) {
                        this.hoveringNode.onHoverEnd();
                    }
                }

                this.editorCanvas.mouseZoomer.onMouseMove(event);
                break;

            case CanvasState.MOVING_NODE:
                this.selectedNode.boundary.position.x += mouseWorldPos.x - this.prevMouseWorldPos.x;
                this.selectedNode.boundary.position.y += mouseWorldPos.y - this.prevMouseWorldPos.y;
                this.selectedNode.calculate();
                break;
        }

        this.hoveringNode = hoveringNode;
        this.prevMouseWorldPos.x = mouseWorldPos.x;
        this.prevMouseWorldPos.y = mouseWorldPos.y;
    }
}