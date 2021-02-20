import Node from "../../NodeEditorFramework/Elements/Node.js";
import  ValueType  from "../../NodeEditorFramework/Elements/ValueType.js";

export default class XorNode extends Node{ 
    constructor(x, y) {
        super("Xor", x, y);

        this.addInputSocket("in1", ValueType.BOOLEAN);
        this.addInputSocket("in2", ValueType.BOOLEAN);
        this.addOutputSocket("out", ValueType.BOOLEAN);
    }

    update() {
        this.setOutput("out", this.getInput("in1") ^ this.getInput("in2"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}