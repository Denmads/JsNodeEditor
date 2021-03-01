import generateWireSections from "./WireSectionGenerator.js";
import Node from "../Node.js";

export default class Wire {
    
    constructor(start, end, valueType) {
        this.start = start;
        this.end = end;
        this.valueType = valueType;

        this.wireWidth = 2;
        this.cornerRadius = 15;

        this.sections = [];
        this.highlight = false;
    }

    calculate() {
        this.sections = generateWireSections(this.start, this.end, this.cornerRadius, {
            type: this.valueType,
            width: this.wireWidth
        });
    }

    draw(context, zoomer) {
        context.beginPath();
        for (let sec of this.sections) {
            sec.draw(context, zoomer);
        }

        if (this.highlight) {
            context.strokeStyle = Node.SELECTED_BORDER_COLOR;
            context.lineWidth = zoomer.zoomed(this.wireWidth * 4);
            context.stroke();
        }

        context.strokeStyle = this.valueType.color;
        context.lineWidth = zoomer.zoomed(this.wireWidth * 2);
        context.stroke();
    }
}