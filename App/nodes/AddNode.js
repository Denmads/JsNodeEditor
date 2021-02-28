import Node from "../../NodeEditorFramework/Elements/Node.js";
import Property from "../../NodeEditorFramework/Elements/Property.js";
import  ValueType  from "../../NodeEditorFramework/Elements/ValueType.js";

export default class AddNode extends Node{ 
    constructor(x, y) {
        super("Add", x, y);

        this.addInputSocket("in1", ValueType.NUMBER);
        this.addInputSocket("in2", ValueType.NUMBER);
        this.addOutputSocket("out", ValueType.NUMBER);

        this.addProperty("Test", new Property(ValueType.STRING, "hej"))
        this.addProperty("TestNum", new Property(ValueType.NUMBER, 123))
        this.addProperty("TestBool", new Property(ValueType.BOOLEAN, false))
    }

    update() {

        if (this.getProperty("Test") == "fail") {
            this.setError("Test is fail");
        }

        this.setOutput("out", this.getInput("in1") + this.getInput("in2"));
    }

    draw(context, zoomer, x, y) {
        super.draw(context, zoomer, x, y);
    }
}