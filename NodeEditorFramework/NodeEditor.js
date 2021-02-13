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
        this.objectPickerPanel = new ObjectPickerPanel(this.rootDiv, this.style);
        this.editorCanvas = new EditorCanvas(this.rootDiv, this.style);
        this.propertiesPanel = new PropertiesPanel(this.rootDiv, this.style);
    }

    createRootDisplay() {
        this.rootDiv = document.createElement("div");
        if (this.width != undefined && this.height != undefined) {
            this.rootDiv.style.width = this.width;
            this.rootDiv.style.height = this.height;
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
    }

    getDisplay() {
        return this.rootDiv;
    }
}