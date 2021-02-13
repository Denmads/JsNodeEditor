export default class PropertiesPanel {
    constructor(parent, style) {
        this.panelWidth = "15%";

        this.panel = document.createElement("div");
        this.panel.style.height = "100%";
        this.panel.style.width = this.panelWidth;
        this.panel.style.backgroundColor = style.panelBackgroundColor;
        parent.appendChild(this.panel);
    }
}