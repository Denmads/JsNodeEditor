import Point from "./Point.js";
import Socket, { SocketType } from "./Socket.js";

export default class Node {
    constructor(name, x, y) {
        this.position = new Point(x, y);

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
        
    }

    setOutput(name, value) {
        this.sockets.outputs[name].value = value;
    }

    calculate () {
        this.maxSockets = Math.max(Object.keys(this.sockets.inputs).length, Object.keys(this.sockets.outputs).length);

        this.height = this.spaceAroundSockets * 2 + this.maxSockets * Socket.size * 2 + this.spaceAroundSockets * (this.maxSockets-1);
        this.width = 70;
    }

    calculateInternal() {
        this.internalWidth = this.width - Socket.size * 4;
        this.internalHeight = this.height - Socket.size * 2;
    }

    update() {
        //Custom logic goes here
        return
    }

    draw(context, zoomer) {

        context.fillStyle = this.nodeBackgroundColor;
        context.strokeStyle = "#000000";
        context.lineWidth = zoomer.zoomed(1.5);

        context.beginPath();

        context.moveTo(zoomer.worldToScreenX(this.position.x - this.width/2), zoomer.worldToScreenY(this.position.y - this.height/2 + this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.position.x - this.width/2), zoomer.worldToScreenY(this.position.y - this.height/2), zoomer.worldToScreenX(this.position.x - this.width/2 + this.cornerRadius), zoomer.worldToScreenY(this.position.y - this.height/2));
        context.lineTo(zoomer.worldToScreenX(this.position.x + this.width/2 - this.cornerRadius), zoomer.worldToScreenY(this.position.y - this.height/2));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.position.x + this.width/2), zoomer.worldToScreenY(this.position.y - this.height/2), zoomer.worldToScreenX(this.position.x + this.width/2), zoomer.worldToScreenY(this.position.y - this.height/2 + this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(this.position.x + this.width/2), zoomer.worldToScreenY(this.position.y + this.height/2 - this.cornerRadius));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.position.x + this.width/2), zoomer.worldToScreenY(this.position.y + this.height/2), zoomer.worldToScreenX(this.position.x + this.width/2 - this.cornerRadius), zoomer.worldToScreenY(this.position.y + this.height/2));
        context.lineTo(zoomer.worldToScreenX(this.position.x - this.width/2 + this.cornerRadius), zoomer.worldToScreenY(this.position.y + this.height/2));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.position.x - this.width/2), zoomer.worldToScreenY(this.position.y + this.height/2), zoomer.worldToScreenX(this.position.x - this.width/2), zoomer.worldToScreenY(this.position.y + this.height/2 - this.cornerRadius));
        context.lineTo(zoomer.worldToScreenX(this.position.x - this.width/2), zoomer.worldToScreenY(this.position.y - this.height/2 + this.cornerRadius));

        context.fill();
        context.stroke();

        for (let i = 0; i < this.maxSockets; i++) {
            let ySoc = this.position.y - this.height/2 + this.spaceAroundSockets + Socket.size + (i * (Socket.size * 2 + this.spaceAroundSockets));
            let inputKeys = Object.keys(this.sockets.inputs);
            if (inputKeys[i] != undefined) {
                this.sockets.inputs[inputKeys[i]].draw(context, zoomer, this.position.x - this.width/2, ySoc);
            }
            
            let outputKeys = Object.keys(this.sockets.outputs);
            if (outputKeys[i] != undefined) {
                this.sockets.outputs[outputKeys[i]].draw(context, zoomer, this.position.x + this.width/2, ySoc);
            }
        }


        this.drawInternal(context, zoomer, this.internalWidth, this.internalHeight);
    }

    drawInternal(context, zoomer, width, height) {
        // Can be overwritten for custom drawing
        context.font = zoomer.zoomed(12) + "px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = "#000000";
        context.fillText(this.name, zoomer.worldToScreenX(this.position.x), zoomer.worldToScreenY(this.position.y), zoomer.zoomed(width));
    }
}