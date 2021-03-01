import Point from "../../Mathematical/Point.js";
import WireSection from "../WireSection.js";

export default class CornerWireSection extends WireSection{

    constructor(valueType, start, end, width, control) {
        super(valueType, start, end, width);
        this.control = control;
        this.radius = Math.max(Math.abs(start.x - control.x), Math.abs(start.y - control.y));

        let controlToStart = new Point(start.x - control.x, start.y - control.y);
        let controlToEnd = new Point(end.x - control.x, end.y - control.y);
        this.center = new Point(control.x + controlToStart.x + controlToEnd.x, control.y + controlToStart.y + controlToEnd.y);
    
        this.centerToStart = new Point(this.start.x - this.center.x, this.start.y - this.center.y);
        this.centerToEnd = new Point(this.end.x - this.center.x, this.end.y - this.center.y);

        if (this.centerToStart.y == 0) {
            this.centerToStart.y = Math.sign(this.centerToEnd.y);
        }
        else if (this.centerToEnd.y == 0) {
            this.centerToEnd.y = Math.sign(this.centerToStart.y);
        }
    }

    containsPoint(x, y) {
        let diffX = x - this.center.x;
        let diffY = y - this.center.y;
        let sqrDist = diffX * diffX + diffY * diffY
        let minDist = (this.radius - this.zoomedWidth) * (this.radius - this.zoomedWidth);
        let maxDist = (this.radius + this.zoomedWidth) * (this.radius + this.zoomedWidth);

        let withinDist = minDist < sqrDist && sqrDist < maxDist;
        if (!withinDist)
            return false;

        let startAngle = Math.atan2(this.centerToStart.y, this.centerToStart.x);
        let endAngle = Math.atan2(this.centerToEnd.y, this.centerToEnd.x);
        let pointAngle = Math.atan2(diffY, diffX);

        let withinAngle = Math.min(startAngle, endAngle) < pointAngle && pointAngle < Math.max(startAngle, endAngle);

        return withinAngle;
    }

    drawCurve(context, zoomer) {
        context.moveTo(zoomer.worldToScreenX(this.start.x), zoomer.worldToScreenY(this.start.y));
        context.quadraticCurveTo(zoomer.worldToScreenX(this.control.x), zoomer.worldToScreenY(this.control.y), zoomer.worldToScreenX(this.end.x), zoomer.worldToScreenY(this.end.y));
    }

    draw(context, zoomer) {
        super.draw(context, zoomer);
    
        this.drawCurve(context, zoomer)
    }
}