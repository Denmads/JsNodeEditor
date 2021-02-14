import EditorStyle from "./EditorStyle.js";
import ObjectPickerPanel from "./ObjectPickerPanel.js";
import EditorCanvas from "./EditorCanvas.js";
import PropertiesPanel from "./PropertiesPanel.js";

export default class NodeEditor {
    constructor(width=undefined, height=undefined) {
        this.style = new EditorStyle();
        this.width = width;
        this.height = height;
        
        this.createRootDisplay();
    }

    initialize() {
        this.editorCanvas = new EditorCanvas(this.rootDiv, this.style);
        this.objectPickerPanel = new ObjectPickerPanel(this.rootDiv, this.style);
        this.propertiesPanel = new PropertiesPanel(this.rootDiv, this.style);

        this.editorCanvas.redraw();
    }

    createRootDisplay() {
        this.rootDiv = document.createElement("div");
        if (this.width != undefined && this.height != undefined) {
            this.rootDiv.style.width = this.width + "px";
            this.rootDiv.style.height = this.height + "px";
        }
        else if (this.width == undefined && this.height == undefined) {
            this.rootDiv.style.margin = "auto";
            this.rootDiv.style.height = "100vh";
        }
        else {
            throw new Error("Width and height must both be initialized or undefined!");
        }
        this.rootDiv.style.backgroundColor = this.style.backgroundColor;
        this.rootDiv.style.display = "flex";
        this.rootDiv.style.justifyContent = "space-between";
        this.rootDiv.style.overflow = "hidden";
    }

    getDisplay() {
        return this.rootDiv;
    }
}