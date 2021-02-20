import Node from "../../NodeEditorFramework/Elements/Node.js";
import  ValueType  from "../../NodeEditorFramework/Elements/ValueType.js";

export default class NotNode extends Node{ 
    constructor(x, y) {
        super("Not", x, y);

        this.addInputSocket("in1", ValueType.BOOLEAN);
        this.addOutputSocket("out", ValueType.BOOLEAN);
    }

    update() {
        this.setOutput("out", !this.getInput("in1"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}