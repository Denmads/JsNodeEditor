import Node from "../../NodeEditorFramework/Elements/Node.js";
import { SocketValueType } from "../../NodeEditorFramework/Elements/Socket.js";

export default class AddNode extends Node{ 
    constructor(x, y) {
        super("Add", x, y);

        this.addInputSocket("in1", SocketValueType.NUMBER);
        this.addInputSocket("in2", SocketValueType.NUMBER);
        this.addOutputSocket("out", SocketValueType.NUMBER);
    }

    update() {
        this.setOutput("out", this.getInput("in1") + this.getInput("in2"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}