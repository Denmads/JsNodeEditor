import Rect from "./Mathematical/Rect.js";
import Socket, { SocketType } from "./Socket.js";

export default class Node {
    constructor(name, x, y) {
        this.boundary = new Rect(x, y);
        this.internalBoundary = new Rect();

        this.sockets = {
            inputs: {},
            outputs: {},
            size: 10
        }

        this.name = name;

        this.spaceAroundSockets = 5;
        this.nodeBackgroundColor = "#666666";
        this.cornerRadius = 5;


    }

    addInputSocket(name, valueType) {
        this.sockets.inputs[name] = new Socket(SocketType.INPUT, valueType);
    }

    addOutputSocket(name, valueType) {
        this.sockets.outputs[name] = new Socket(SocketType.OUTPUT, valueType);
    }

    getInput(name) {
        return this.sockets.inputs[name].value
    }

    setOutput(name, value) {
        this.sockets.outputs[name].value = value;
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
    }

    draw(context, zoomer) {

        context.fillStyle = this.nodeBackgroundColor;
        context.strokeStyle = "#000000";
        context.lineWidth = zoomer.zoomed(1.5);

        context.beginPath();

        context.moveTo(zoomer.worldToScreenX(this.boundary.x), zoomer.worldToScreenY(this.boundary.y + this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.x), zoomer.worldToScreenY(this.boundary.y), zoomer.worldToScreenX(this.boundary.x + this.cornerRadius), zoomer.worldToScreenY(this.boundary.y));
        context.lineTo(zoomer.worldToScreenX(this.boundary.x + this.width - this.cornerRadius), zoomer.worldToScreenY(this.boundary.y));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.x + this.width), zoomer.worldToScreenY(this.boundary.y), zoomer.worldToScreenX(this.boundary.x + this.width), zoomer.worldToScreenY(this.boundary.y + this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(this.boundary.x + this.width), zoomer.worldToScreenY(this.boundary.y + this.height - this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.x + this.width), zoomer.worldToScreenY(this.boundary.y + this.height), zoomer.worldToScreenX(this.boundary.x + this.width - this.cornerRadius), zoomer.worldToScreenY(this.boundary.y + this.height));
        context.lineTo(zoomer.worldToScreenX(this.boundary.x + this.cornerRadius), zoomer.worldToScreenY(this.boundary.y + this.height));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.boundary.x), zoomer.worldToScreenY(this.boundary.y + this.height), zoomer.worldToScreenX(this.boundary.x), zoomer.worldToScreenY(this.boundary.y + this.height - this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(this.boundary.x), zoomer.worldToScreenY(this.boundary.y + this.cornerRadius));

        context.fill();
        context.stroke();

        for (let i = 0; i < this.maxSockets; i++) {
            let ySoc = this.boundary.y + this.spaceAroundSockets + Socket.size + (i * (Socket.size * 2 + this.spaceAroundSockets));
            let inputKeys = Object.keys(this.sockets.inputs);
            if (inputKeys[i] != undefined) {
                this.sockets.inputs[inputKeys[i]].draw(context, zoomer, this.boundary.x, ySoc);
            }
            
            let outputKeys = Object.keys(this.sockets.outputs);
            if (outputKeys[i] != undefined) {
                this.sockets.outputs[outputKeys[i]].draw(context, zoomer, this.boundary.x + this.width, ySoc);
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
        context.fillText(this.name, zoomer.worldToScreenX(internalRect.position.x), zoomer.worldToScreenY(internalRect.position.y), zoomer.zoomed(internalRect.width));
    }

    clone() {
        let cloned = new Node();
    }
}