export const SocketType = {
    INPUT: "IN",
    OUTPUT: "OUT"
}

export default class Socket {

    static size = 5;

    constructor(type, valueType) {
        this.type = type;
        this.valueType = valueType;
        this.value = undefined;
        

        this.wire = undefined;
    }

    draw(context, zoomer, x, y) {
        context.fillStyle = this.valueType.color;
        context.strokeStyle = "#000000"
        context.lineWidth = zoomer.zoomed(1.5);

        context.beginPath();
        context.ellipse(zoomer.worldToScreenX(x), zoomer.worldToScreenY(y), zoomer.zoomed(Socket.size), zoomer.zoomed(Socket.size), 0, 0, Math.PI*2 );
        context.fill();
        context.stroke();
    }
}