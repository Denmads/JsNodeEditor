import Point from "./Point.js";

export default class Rect {
    constructor(x=0, y=0, width=0, height=0) {
        this.position = new Point(x, y);
        this.width = width;
        this.height = height;
    }

    intersects(rect) {
        let leftNotIntersecting = rect.position.x > this.position.x + this.width;
        let rightNotIntersecting = rect.position.x + rect.width < this.position.x;
        let bottomNotIntersecting = rect.position.y + rect.height < this.position.y;
        let topNotIntersecting = rect.position.y > this.position.y + this.height;

        return !(leftNotIntersecting && rightNotIntersecting && bottomNotIntersecting && topNotIntersecting);
    }

    contains(x, y) {
        return x >= this.position.x && x <= this.position.x + this.width && y >= this.position.y && y <= this.position.y + this.height;
    }

    clone() {
        return new Rect(this.position.x, this.position.y, this.width, this.height);
    }
}