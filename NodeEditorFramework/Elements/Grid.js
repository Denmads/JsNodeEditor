export default class Grid {
    constructor (style) {
        this.style = style;
        this.offset = {
            x: 0,
            y: 0
        }
    }

    draw(context, scale) {
        context.strokeStyle = this.style.gridColor;

        let w = context.canvas.width * scale;
        let h = context.canvas.height * scale;

        
        for (let y = this.offset.y; y < h; y += this.style.minorGridSize) {
            
            if ((y - this.offset.y) % this.style.majorGridSize == 0 ) {
                context.lineWidth = this.style.majorGridThickness;
            }
            else {
                context.lineWidth = this.style.minorGridThickness;
            }
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(w, y);
            context.stroke();
        }

        for (let x = this.offset.x; x < w; x += this.style.minorGridSize) {
            if ((x - this.offset.x) % this.style.majorGridSize == 0 ) {
                context.lineWidth = this.style.majorGridThickness;
            }
            else {
                context.lineWidth = this.style.minorGridThickness;
            }
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, h);
            context.stroke();
        }
        
    }
}