import Node from "../../NodeEditorFramework/Elements/Node";
import { SocketValueType } from "../../NodeEditorFramework/Elements/Socket";

export default class AndNode extends Node{ 
    constructor() {
        super()

        this.addInputSocket("in1", SocketValueType.BOOLEAN);
        this.addInputSocket("in2", SocketValueType.BOOLEAN);
        this.addOutputSocket("out", SocketValueType.BOOLEAN);
    }

    update() {
        this.setOutput("out", this.getInput("in1") && this.getInput("in2"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}