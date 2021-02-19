import Node from "../../NodeEditorFramework/Elements/Node.js";
import { SocketValueType } from "../../NodeEditorFramework/Elements/Socket.js";

export default class XorNode extends Node{ 
    constructor(x, y) {
        super("Xor", x, y);

        this.addInputSocket("in1", SocketValueType.BOOLEAN);
        this.addInputSocket("in2", SocketValueType.BOOLEAN);
        this.addOutputSocket("out", SocketValueType.BOOLEAN);
    }

    update() {
        this.setOutput("out", this.getInput("in1") ^ this.getInput("in2"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}