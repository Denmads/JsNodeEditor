export default class WireSection {

    constructor(valueType, start, end, width) {
        this.valueType = valueType;
        this.start = start;
        this.end = end;
        this.width = width;
        this.zoomedWidth = width;
    }

    containsPoint(x, y) {
        //Wether the given point is on the section
    }

    draw(context, zoomer) {
        this.zoomedWidth = zoomer.zoomed(this.width);

        context.strokeStyle = this.valueType.color;
        context.lineWidth = zoomer.zoomed(this.width*2);

        //Draws the section
    }

    drawHighlight(context, zoomer, color) {
        this.zoomedWidth = zoomer.zoomed(this.width);

        context.strokeStyle = color;
        context.lineWidth = zoomer.zoomed(this.width*4);
    }
}