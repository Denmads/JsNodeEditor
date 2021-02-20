import Point from "./Point.js";

export default class QuadTree {
    constructor(x, y, width, height, maximumBucketCapacity) {
        this.position = new Point(x, y);
        this.width = width;
        this.height = height;
        this.buckets = [undefined, undefined, undefined, undefined]

        this.haveSplit = false;

        this.nodes = []
    }

    addNode(node) {
        if (this.haveSplit) {
            this.delegateNode(node);
        }
        else {
            this.nodes.push(node);
            this.checkCapacity();
        }
    }

    checkCapacity() {
        if (this.nodes.length > this.maximumBucketCapacity) {
            this.buckets[Buckets.TopLeft] = new QuadTree(this.position.x, this.position.y, this.width/2, this.height/2);
            this.buckets[Buckets.TopRight] = new QuadTree(this.width/2, this.position.y, this.width/2, this.height/2);
            this.buckets[Buckets.BottomLeft] = new QuadTree(this.position.x, this.height/2, this.width/2, this.height/2);
            this.buckets[Buckets.BottomRight] = new QuadTree(this.width/2, this.height/2, this.width/2, this.height/2);

            while (this.nodes.length > 0) {
                let node = this.nodes.pop();
                this.delegateNode(node);
            }
        }
    }

    delegateNode(node) {
        if (this.buckets[Buckets.TopLeft].contains(node.position.x, node.position.y)) {
            this.buckets[Buckets.TopLeft].addNode(node);
        }
        else if (this.buckets[Buckets.TopRight].contains(node.position.x, node.position.y)) {
            this.buckets[Buckets.TopRight].addNode(node);
        }
        else if (this.buckets[Buckets.BottomLeft].contains(node.position.x, node.position.y)) {
            this.buckets[Buckets.BottomLeft].addNode(node);
        }
        else if (this.buckets[Buckets.BottomRight].contains(node.position.x, node.position.y)) {
            this.buckets[Buckets.BottomRight].addNode(node);
        }
    }

    getNodesInRegion(x, y, width, height) {
        let inRegion = [];

        if (this.haveSplit) {
            inRegion.push(...this.buckets[Buckets.TopLeft].getNodesInRegion(x, y, width, height));
            inRegion.push(...this.buckets[Buckets.TopRight].getNodesInRegion(x, y, width, height));
            inRegion.push(...this.buckets[Buckets.BottomLeft].getNodesInRegion(x, y, width, height));
            inRegion.push(...this.buckets[Buckets.BottomRight].getNodesInRegion(x, y, width, height));
        }
        else {
            for (let i = 0; i < this.nodes.length; i++) {
                let node = this.nodes[i];
                if (node.position.x >= x && node.position.x <= x + width && node.position.y >= y && node.position.y <= y + height) {
                    inRegion.push(node);
                }
            }
        }

        return inRegion;
    }

    intersects(x, y, width, height) {
        let leftNotIntersecting = x > this.position.x + this.width;
        let rightNotIntersecting = x + width < this.position.x;
        let bottomNotIntersecting = y + height < this.position.y;
        let topNotIntersecting = y > this.position.y + this.height;

        return !(leftNotIntersecting && rightNotIntersecting && bottomNotIntersecting && topNotIntersecting);
    }

    contains(x, y) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height;
    }
}

const Buckets = {
    TopLeft: 0,
    TopRight: 1,
    BottomLeft: 2,
    BottomRight: 3
}