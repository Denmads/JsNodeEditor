import Node from "../../NodeEditorFramework/Elements/Node.js";
import  ValueType  from "../../NodeEditorFramework/Elements/ValueType.js";

export default class AddNode extends Node{ 
    constructor(x, y) {
        super("Add", x, y);

        this.addInputSocket("in1", ValueType.NUMBER);
        this.addInputSocket("in2", ValueType.NUMBER);
        this.addOutputSocket("out", ValueType.NUMBER);
    }

    update() {
        this.setOutput("out", this.getInput("in1") + this.getInput("in2"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}