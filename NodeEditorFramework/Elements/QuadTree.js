import Point from "./Mathematical/Point.js";
import Rect from "./Mathematical/Rect.js";

export default class QuadTree {
    constructor(x, y, width, height, maximumBucketCapacity) {
        this.region = new Rect(x, y, width, height);
        this.width = width;
        this.height = height;
        this.buckets = [undefined, undefined, undefined, undefined]

        this.maximumBucketCapacity = maximumBucketCapacity;

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
            this.buckets[Buckets.TopLeft] = new QuadTree(this.position.x, this.position.y, this.width/2, this.height/2, this.maximumBucketCapacity);
            this.buckets[Buckets.TopRight] = new QuadTree(this.width/2, this.position.y, this.width/2, this.height/2, this.maximumBucketCapacity);
            this.buckets[Buckets.BottomLeft] = new QuadTree(this.position.x, this.height/2, this.width/2, this.height/2, this.maximumBucketCapacity);
            this.buckets[Buckets.BottomRight] = new QuadTree(this.width/2, this.height/2, this.width/2, this.height/2, this.maximumBucketCapacity);

            while (this.nodes.length > 0) {
                let node = this.nodes.pop();
                this.delegateNode(node);
            }

            this.haveSplit = true;
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

    getNodesInRegion(rect) {
        let inRegion = [];

        if (this.haveSplit) {
            inRegion.push(...this.buckets[Buckets.TopLeft].getNodesInRegion(rect));
            inRegion.push(...this.buckets[Buckets.TopRight].getNodesInRegion(rect));
            inRegion.push(...this.buckets[Buckets.BottomLeft].getNodesInRegion(rect));
            inRegion.push(...this.buckets[Buckets.BottomRight].getNodesInRegion(rect));
        }
        else {
            for (let i = 0; i < this.nodes.length; i++) {
                let node = this.nodes[i];
                if (rect.contains(node.boundary.position.x, node.boundary.position.y)) {
                    inRegion.push(node);
                }
            }
        }

        return inRegion;
    }

    intersects(rect) {
        return this.region.intersects(rect);
    }

    contains(x, y) {
        return this.region.contains(x, y);
    }
}

const Buckets = {
    TopLeft: 0,
    TopRight: 1,
    BottomLeft: 2,
    BottomRight: 3
}