import Rect from "./Mathematical/Rect.js";
import Socket, { SocketType } from "./Socket.js";

export default class Node {
    static DEFAULT_BORDER_COLOR = "#000000";
    static SELECTED_BORDER_COLOR = "#e6d64c";
    static HOVER_BORDER_COLOR = "#969369";

    static DEFAULT_BACKGROUND_COLOR = "#666666";
    static ERROR_BACKGROUND_COLOR = "#aa4444";

    constructor(name, x, y) {
        this.boundary = new Rect(x, y);
        this.internalBoundary = new Rect();

        this.sockets = {
            inputs: {},
            outputs: {},
            size: 10
        }

        this.properties = {}

        this.name = name;

        this.selected = false;

        this.error = undefined;
        this.errorStateCallbacks = [];

        this.spaceAroundSockets = 5;
        this.prevBackColor = Node.DEFAULT_BACKGROUND_COLOR;
        this.nodeBackgroundColor = Node.DEFAULT_BACKGROUND_COLOR;
        this.nodeBorderColor = Node.DEFAULT_BORDER_COLOR;
        this.cornerRadius = 5;
    }

    addInputSocket(name, valueType) {
        this.sockets.inputs[name] = new Socket(SocketType.INPUT, valueType);
    }

    addOutputSocket(name, valueType) {
        this.sockets.outputs[name] = new Socket(SocketType.OUTPUT, valueType);
    }

    addProperty(name, property) {
        property.setNode(this);
        this.properties[name] = property;
    }

    getProperty(name) {
        return this.properties[name].value;
    }

    getInput(name) {
        return this.sockets.inputs[name].value
    }

    setOutput(name, value) {
        this.sockets.outputs[name].value = value;
    }

    setError(message) {
        this.error = message;
    }

    registerOnErrorStateChangeCallback(id, callback) {
        this.errorStateCallbacks.push({
            id: id,
            callback: callback
        });
    }
    
    unregisterOnErrorStateChangeCallback(id) {
        this.errorStateCallbacks = this.errorStateCallbacks.filter((val, index, arr) => {
            return val.id != id;
        })
    }

    resetError() {
        this.error = undefined;
    }

    calculate () {
        this.maxSockets = Math.max(Object.keys(this.sockets.inputs).length, Object.keys(this.sockets.outputs).length);

        this.calculateSize();
        this.calculateInternal();
    }

    calculateSize() {
        //Overwrite this method to give the node a custom size, width and height of boundary must be set!
        this.boundary.height = this.spaceAroundSockets * 2 + this.maxSockets * Socket.size * 2 + this.spaceAroundSockets * (this.maxSockets-1);
        this.boundary.width = 70;
    }

    calculateInternal() {
        this.internalBoundary.width = this.boundary.width - Socket.size * 4;
        this.internalBoundary.height = this.boundary.height - Socket.size * 2;
        this.internalBoundary.position.x = this.boundary.position.x + (this.boundary.width - this.internalBoundary.width) / 2;
        this.internalBoundary.position.y = this.boundary.position.y + (this.boundary.height - this.internalBoundary.height) / 2;
    }

    update() {
        //Custom logic goes here
        
        //Use setError(message), when an error occurs in the update
    }

    onRightClick() {

    }

    onHover() {
        if (this.nodeBorderColor != Node.HOVER_BORDER_COLOR && !this.selected) {
            this.nodeBorderColor = Node.HOVER_BORDER_COLOR;
        }
    }

    onHoverStart() {
        if (!this.selected)
            this.nodeBorderColor = Node.HOVER_BORDER_COLOR;
    }

    onHoverEnd() {
        if (!this.selected)
            this.nodeBorderColor = Node.DEFAULT_BORDER_COLOR;
    }

    onSelect() {
        this.selected = true;
        this.nodeBorderColor = Node.SELECTED_BORDER_COLOR;
    }

    onDeselect() {
        this.selected = false;
        this.nodeBorderColor = Node.DEFAULT_BORDER_COLOR;
    }

    onUpdateError() {
        if (this.nodeBackgroundColor != Node.ERROR_BACKGROUND_COLOR) {
            this.prevBackColor = this.nodeBackgroundColor;

            for (const callback of this.errorStateCallbacks) {
                callback.callback();
            }
        }
        this.nodeBackgroundColor = Node.ERROR_BACKGROUND_COLOR;
    }
    onNoUpdateError() {
        if (this.nodeBackgroundColor == Node.ERROR_BACKGROUND_COLOR) {
            for (const callback of this.errorStateCallbacks) {
                callback.callback();
            }
        }

        this.nodeBackgroundColor = this.prevBackColor;
    }

    draw(context, zoomer) {

        context.fillStyle = this.nodeBackgroundColor;
        context.strokeStyle = this.nodeBorderColor;
        context.lineWidth = zoomer.zoomed(1.5);

        context.beginPath();

        context.moveTo(zoomer.worldToScreenX(this.boundary.position.x), zoomer.worldToScreenY(this.boundary.position.y + this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.position.x), zoomer.worldToScreenY(this.boundary.position.y), zoomer.worldToScreenX(this.boundary.position.x + this.cornerRadius), zoomer.worldToScreenY(this.boundary.position.y));
        context.lineTo(zoomer.worldToScreenX(this.boundary.position.x + this.boundary.width - this.cornerRadius), zoomer.worldToScreenY(this.boundary.position.y));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.position.x + this.boundary.width), zoomer.worldToScreenY(this.boundary.position.y), zoomer.worldToScreenX(this.boundary.position.x + this.boundary.width), zoomer.worldToScreenY(this.boundary.position.y + this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(this.boundary.position.x + this.boundary.width), zoomer.worldToScreenY(this.boundary.position.y + this.boundary.height - this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.position.x + this.boundary.width), zoomer.worldToScreenY(this.boundary.position.y + this.boundary.height), zoomer.worldToScreenX(this.boundary.position.x + this.boundary.width - this.cornerRadius), zoomer.worldToScreenY(this.boundary.position.y + this.boundary.height));
        context.lineTo(zoomer.worldToScreenX(this.boundary.position.x + this.cornerRadius), zoomer.worldToScreenY(this.boundary.position.y + this.boundary.height));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.position.x), zoomer.worldToScreenY(this.boundary.position.y + this.boundary.height), zoomer.worldToScreenX(this.boundary.position.x), zoomer.worldToScreenY(this.boundary.position.y + this.boundary.height - this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(this.boundary.position.x), zoomer.worldToScreenY(this.boundary.position.y + this.cornerRadius));

        context.fill();
        context.stroke();

        for (let i = 0; i < this.maxSockets; i++) {
            let ySoc = this.boundary.position.y + this.spaceAroundSockets + Socket.size + (i * (Socket.size * 2 + this.spaceAroundSockets));
            let inputKeys = Object.keys(this.sockets.inputs);
            if (inputKeys[i] != undefined) {
                this.sockets.inputs[inputKeys[i]].draw(context, zoomer, this.boundary.position.x, ySoc);
            }
            
            let outputKeys = Object.keys(this.sockets.outputs);
            if (outputKeys[i] != undefined) {
                this.sockets.outputs[outputKeys[i]].draw(context, zoomer, this.boundary.position.x + this.boundary.width, ySoc);
            }
        }


        this.drawInternal(context, zoomer, this.internalBoundary);
    }

    drawInternal(context, zoomer, internalRect) {
        // Can be overwritten for custom drawing
        context.font = zoomer.zoomed(12) + "px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#000000";
        context.fillText(this.name, zoomer.worldToScreenX(internalRect.position.x + internalRect.width/2), zoomer.worldToScreenY(internalRect.position.y + internalRect.height/2), zoomer.zoomed(internalRect.width));
    }
}