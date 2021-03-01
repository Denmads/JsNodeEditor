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

        //Draws the section
    }
}