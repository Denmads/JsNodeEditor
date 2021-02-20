export const CanvasState = {
    DEFAULT: "default",
    PLACING: "placing",
    MOVING_NODE: "move_node"
}

export default class CanvasStateMachine {
    constructor() {
        this.state = CanvasState.DEFAULT;
        this.placing_node = undefined;
    }
}