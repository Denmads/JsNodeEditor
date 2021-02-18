import Point from "./Point.js";
import Socket, { SocketType } from "./Socket.js";

export default class Node {
    constructor() {
        this.sockets = {
            inputs: {},
            outputs: {},
            size: 10
        }

        this.spaceAroundSockets = 5;
        this.nodeBackgroundColor = "#666666";
        this.cornerRadius = 5;


    }

    addInputSocket(name, valueType) {
        this.sockets.inputs[name] = (new Socket(SocketType.INPUT, valueType));
    }

    addOutputSocket(name, valueType) {
        this.sockets.inputs[name] = (new Socket(SocketType.OUTPUT, valueType));
    }

    getInput(name) {
        
    }

    setOutput(name, value) {
        this.sockets.outputs[name].value = value;
    }

    calculate () {
        this.maxSockets = Math.max(this.sockets.inputs.length, this.sockets.outputs.length);

        this.height = this.spaceAroundSockets * 2 + maxSockets * Socket.size * 2 + this.spaceAroundSockets * (maxSockets-1);
        this.width = 70;
    }

    update() {
        return
    }

    draw(context, zoomer, x, y) {
        

        context.fillStyle = this.nodeBackgroundColor;
        context.strokeStyle = "#000000";
        context.lineWidth = zoomer.zoomed(1.5);

        context.beginPath();

        context.moveTo(zoomer.worldToScreenX(x - width/2), zoomer.worldToScreenY(y - height/2 + this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(x - width/2), zoomer.worldToScreenY(y - height/2), zoomer.worldToScreenX(x - width/2 + this.cornerRadius), zoomer.worldToScreenY(y - height/2));
        context.lineTo(zoomer.worldToScreenX(x + width/2 - this.cornerRadius), zoomer.worldToScreenY(y - height/2));
        context.quadraticCurveTo(zoomer.worldToScreenX(x + width/2), zoomer.worldToScreenY(y - height/2), zoomer.worldToScreenX(x + width/2), zoomer.worldToScreenY(y - height/2 + this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(x + width/2), zoomer.worldToScreenY(y + height/2 - this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(x + width/2), zoomer.worldToScreenY(y + height/2), zoomer.worldToScreenX(x + width/2 - this.cornerRadius), zoomer.worldToScreenY(y + height/2));
        context.lineTo(zoomer.worldToScreenX(x - width/2 + this.cornerRadius), zoomer.worldToScreenY(y + height/2));
        context.quadraticCurveTo(zoomer.worldToScreenX(x - width/2), zoomer.worldToScreenY(y + height/2), zoomer.worldToScreenX(x - width/2), zoomer.worldToScreenY(y + height/2 - this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(x - width/2), zoomer.worldToScreenY(y - height/2 + this.cornerRadius));

        context.fill();
        context.stroke();

        for (let i = 0; i < maxSockets; i++) {
            let ySoc = y - height/2 + this.spaceAroundSockets + Socket.size + (i * (Socket.size * 2 + this.spaceAroundSockets));
            let inputKeys = Object.keys(this.sockets.inputs);
            if (inputKeys[i] != undefined) {
                this.sockets.inputs[inputKeys[i]].draw(context, zoomer, x - width/2, ySoc);
            }
            
            let outputKeys = Object.keys(this.sockets.outputs);
            if (outputKeys[i] != undefined) {
                this.sockets.outputs[outputKeys[i]].draw(context, zoomer, x + width/2, ySoc);
            }
        }
    }
}