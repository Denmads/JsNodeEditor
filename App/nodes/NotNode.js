import Node from "../../NodeEditorFramework/Elements/Node.js";
import { SocketValueType } from "../../NodeEditorFramework/Elements/Socket.js";

export default class NotNode extends Node{ 
    constructor(x, y) {
        super("Not", x, y);

        this.addInputSocket("in1", SocketValueType.BOOLEAN);
        this.addOutputSocket("out", SocketValueType.BOOLEAN);
    }

    update() {
        this.setOutput("out", !this.getInput("in1"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}