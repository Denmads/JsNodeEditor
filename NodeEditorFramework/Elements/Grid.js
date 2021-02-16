export default class Grid {
    constructor (style) {
        this.style = style;
    }

    draw(editorCanvas, zoomer) {
        console.log(zoomer.worldOrigin);
        editorCanvas.context.strokeStyle = this.style.gridColor;

        let w = editorCanvas.canvas.width;
        let h = editorCanvas.canvas.height;

        let majorMinorFactor = this.style.majorGridSize / this.style.minorGridSize;

        let zoomedMajorGridSize = zoomer.zoomed(this.style.majorGridSize)

        let majorGridOffsetX = zoomer.worldOrigin.x % zoomedMajorGridSize;
        let majorGridOffsetY = zoomer.worldOrigin.y % zoomedMajorGridSize;

        let gridCount = 1
        for (let y = -zoomedMajorGridSize + majorGridOffsetY; y < h; y += zoomer.zoomed(this.style.minorGridSize)) {
            
            if (gridCount % majorMinorFactor == 0 ) {
                editorCanvas.context.lineWidth = this.style.majorGridThickness;
            }
            else {
                editorCanvas.context.lineWidth = this.style.minorGridThickness;
            }
            editorCanvas.context.beginPath();
            editorCanvas.context.moveTo(0, Math.floor(y));
            editorCanvas.context.lineTo(w, Math.floor(y));
            editorCanvas.context.stroke();
            gridCount++;
        }

        gridCount = 1;
        for (let x = -zoomedMajorGridSize + majorGridOffsetX; x < w; x += zoomer.zoomed(this.style.minorGridSize)) {
            if (gridCount % majorMinorFactor == 0 ) {
                editorCanvas.context.lineWidth = this.style.majorGridThickness;
            }
            else {
                editorCanvas.context.lineWidth = this.style.minorGridThickness;
            }
            editorCanvas.context.beginPath();
            editorCanvas.context.moveTo(Math.floor(x), 0);
            editorCanvas.context.lineTo(Math.floor(x), h);
            editorCanvas.context.stroke();
            gridCount++;
        }
        
    }
}