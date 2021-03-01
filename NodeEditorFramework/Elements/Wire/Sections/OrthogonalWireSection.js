import Rect from "../../Mathematical/Rect.js";
import WireSection from "../WireSection.js";

export default class OrthogonalWireSection extends WireSection {

    constructor (valueType, start, end, width) {
        super(valueType, start, end, width);

        this.boundary = new Rect(Math.min(start.x, end.x) - this.zoomedWidth, Math.min(start.y, end.y) - this.zoomedWidth, Math.abs(start.x - end.x) + this.zoomedWidth, Math.abs(start.y - end.y) + this.zoomedWidth);
    }

    containsPoint(x, y) {
        return this.boundary.contains(x, y);
    }

    drawLine(context, zoomer) {
        
        this.boundary = new Rect(Math.min(this.start.x, this.end.x) - this.zoomedWidth, Math.min(this.start.y, this.end.y) - this.zoomedWidth, Math.abs(this.start.x - this.end.x) + this.zoomedWidth, Math.abs(this.start.y - this.end.y) + this.zoomedWidth);

        context.moveTo(zoomer.worldToScreenX(this.start.x), zoomer.worldToScreenY(this.start.y));
        context.lineTo(zoomer.worldToScreenX(this.end.x), zoomer.worldToScreenY(this.end.y));
    }

    draw(context, zoomer) {
        super.draw(context, zoomer);
    
        this.drawLine(context, zoomer)
    }
}