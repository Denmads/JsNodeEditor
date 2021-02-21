export const CanvasState = {
    DEFAULT: "default",
    PLACING: "placing",
    MOVING_NODE: "move_node",
    CREATING_WIRE: "creating_wire"
}

export default class CanvasStateMachine {
    constructor(editorCanvas) {
        this.editorCanvas = editorCanvas;

        this.state = CanvasState.DEFAULT;
        this.placing_node = undefined;

        this.hoveringNode = undefined;
        this.selectedNode = undefined;

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
        let region = new Rect(x - this.editorCanvas.mouseZoomer.zoomedInv(500), y - this.editorCanvas.mouseZoomer.zoomedInv(500), this.editorCanvas.mouseZoomer.zoomedInv(1000), this.editorCanvas.mouseZoomer.zoomedInv(1000));
        let allNodes = this.editorCanvas.nodeContainer.getNodesInRegion(region);
        for (let node of allNodes) {
            if (node.boundary.contains(x, y)) {
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
        let mouseWorldPos = this.getMouseWorldPos(event);

        switch (this.state) {
            case CanvasState.DEFAULT:

                break;
            case CanvasState.PLACING:
                if (this.isButton(event, 0)) {
                    let newNode = new this.stateMachine.placing_node(mouseWorldPos.x, mouseWorldPos.y);
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

    }

    onMouseOut(event) {

    }

    onMouseMove(event) {

    }
}