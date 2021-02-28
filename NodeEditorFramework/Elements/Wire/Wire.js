import Point from "../Mathematical/Point.js";

export default class Wire {
    
    constructor(start, end, valueType) {
        this.start = start;
        this.end = end;
        this.valueType = valueType;

        this.wireWidth = 2;
        this.cornerRadius = 15;

        this.section = [];
    }

    calculate() {
        let newSections = [];

        let dir = (this.start.y > this.end.y ? -1 : 1);

        if (this.end.x > this.start.x) {
            let middleX = (this.start.x + this.end.x) / 2;

            newSections.push({type: WireSectionType.STRAIGHT, start: this.start.clone(), end: new Point(this.start.x + (middleX - this.cornerRadius), this.start.y)});
            newSections.push({type: WireSectionType.CORNER, start: new Point(this.start.x + (middleX - this.cornerRadius), this.start.y), end: new Point(this.start.x + middleX, this.start.y + (dir * this.cornerRadius)), control: });
        }
        else {

        }
    }

    draw(context, zoomer) {

    }
}

class WireSectionType {
    static STRAIGHT = "straight";
    static CORNER = "corner";
}