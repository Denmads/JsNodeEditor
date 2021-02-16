export default class MouseZoomer {
    constructor(canvas) {
        this.canvas = canvas;

        this.scale = 1;
        this.maxScaleLimit = 2;
        this.minScaleLimit = 0.5;
        this.scaleStep = 1.1;

        this.worldOrigin = {
            x: 0,
            y: 0
        }

        this.mouse = {
            screenPosition: {
                x: 0,
                y: 0
            },
            worldPosition: {
                x: 0, 
                y: 0
            },
            live: {
                x: 0,
                y: 0
            },
            pressed: 0
        }
    }

    onMouseScroll(event) {
        if (event.deltaY < 0) {
            this.scale = Math.min(this.maxScaleLimit, this.scale * this.scaleStep);
        }
        else {
            this.scale = Math.max(this.minScaleLimit, this.scale * (1 / this.scaleStep));
        }

        if (this.scale == this.maxScaleLimit || this.scale == this.minScaleLimit) {
            return;
        }

        this.worldOrigin.x = this.mouse.worldPosition.x;
        this.worldOrigin.y = this.mouse.worldPosition.y;
        this.mouse.screenPosition.x = this.mouse.live.x;
        this.mouse.screenPosition.y = this.mouse.live.y;
        this.mouse.worldPosition.x = this.screenToWorldX(this.mouse.live.x);
        this.mouse.worldPosition.y = this.screenToWorldY(this.mouse.live.y);
    }

    onMouseMove(event) {
        if (event.type === "mousedown") {
            this.mouse.pressed = 1;
        }
        else if (event.type === "mouseup" || event.type === "mouseout") {
            this.mouse.pressed = 0;
        }

        let bounds = event.target.getBoundingClientRect();
        this.mouse.live.x = event.clientX - bounds.left;
        this.mouse.live.y = event.clientY - bounds.top;
        var prevMouseWorldPosX = this.mouse.worldPosition.x;
        var prevMouseWorldPosY = this.mouse.worldPosition.y;

        this.mouse.worldPosition.x = this.screenToWorldX(this.mouse.live.x);
        this.mouse.worldPosition.y = this.screenToWorldY(this.mouse.live.y);

        if (this.mouse.pressed === 1) {
            this.worldOrigin.x += this.zoomed(this.mouse.worldPosition.x - prevMouseWorldPosX);
            this.worldOrigin.y += this.zoomed(this.mouse.worldPosition.y - prevMouseWorldPosY);

            this.mouse.worldPosition.x = this.screenToWorldX(this.mouse.live.x);
            this.mouse.worldPosition.y = this.screenToWorldY(this.mouse.live.y);
        }
    }

    zoomed(number) {
        return Math.floor(number * this.scale);
    }

    zoomedInv(number) {
        return Math.floor(number * (1/this.scale));
    }

    worldToScreenX(x) {
        return Math.floor((x - this.worldOrigin.x) * this.scale + this.mouse.screenPosition.x);
    }

    worldToScreenY(y) {
        return Math.floor((y - this.worldOrigin.y) * this.scale + this.mouse.screenPosition.y);
    }

    screenToWorldX(x) {
        return Math.floor((x - this.mouse.screenPosition.x) * (1 / this.scale) + this.worldOrigin.x);
    }

    screenToWorldY(y) {
        return Math.floor((y - this.mouse.screenPosition.y) * (1 / this.scale) + this.worldOrigin.y);
    }
}