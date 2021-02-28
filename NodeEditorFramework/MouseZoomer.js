export default class MouseZoomer {
    constructor(editorCanvas) {
        this.editorCanvas = editorCanvas;

        this.scale = 1;
        this.maxScaleLimit = 2;
        this.minScaleLimit = 0.5;
        this.smallScaleStep = 1.025;
        this.largeScaleStep = 1.05;

        this.worldOrigin = {
            x: 0,
            y: 0
        }

        this.mouse = {
            live: {
                x: 0,
                y: 0
            },
            pressed: 0
        }
    }

    onMouseScroll(event) {
        let step = this.scale <= 1 ? this.smallScaleStep : this.largeScaleStep;
        
        if (event.deltaY < 0) {
            this.scale = Math.min(this.maxScaleLimit, this.scale * step);
        }
        else {
            this.scale = Math.max(this.minScaleLimit, this.scale * (1 / step));
        }

    }

    onMouseDown(event) {
        this.mouse.pressed = 1;
    }

    onMouseUpOrOut(event) {
        this.mouse.pressed = 0;
    }

    onMouseMove(event) {
        let bounds = event.target.getBoundingClientRect();
        let newX = event.clientX - bounds.left;
        let newY = event.clientY - bounds.top;

        if (this.mouse.pressed) {
            this.worldOrigin.x -= newX - this.mouse.live.x;
            this.worldOrigin.y -= newY - this.mouse.live.y;
        }

        this.mouse.live.x = newX;
        this.mouse.live.y = newY;
    }

    zoomed(number) {
        return number * this.scale;
    }

    zoomedInv(number) {
        return number * (1/this.scale);
    }

    worldToScreenX(x) {
        return x * this.scale - this.worldOrigin.x;
    }

    worldToScreenY(y) {
        return y * this.scale - this.worldOrigin.y;
    }

    screenToWorldX(x) {
        return (x + this.worldOrigin.x) / this.scale;
    }

    screenToWorldY(y) {
        return (y + this.worldOrigin.y) / this.scale;
    }
}