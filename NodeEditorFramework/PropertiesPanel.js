export default class PropertiesPanel {
    constructor(parent, style) {
        this.panelWidth = "20%";
        this.hidePercentage = 0.9;
        this.hideTime = 300;

        this.panel = document.createElement("div");
        this.panel.style.height = "100%";
        this.panel.style.width = this.panelWidth;
        this.panel.style.backgroundColor = style.panelBackgroundColor;
        parent.appendChild(this.panel);

        this.title = this.createTitle(style);
        this.panel.appendChild(this.title);

        this.hideWidth = Math.floor(this.panel.clientWidth * this.hidePercentage);
    }

    createTitle (style) {
        let title = document.createElement("div");
        title.style.cursor = "default";
        title.innerText = "Properties";
        title.style.backgroundColor = style.panelSecondaryBackgroundColor;
        title.style.padding = "10px";
        title.style.borderRadius = "20px";
        title.style.float = "left";
        title.style.transform = "rotate(90deg)";
        title.style.transformOrigin = "left";
        title.style.fontSize = "14px";
        title.style.fontWeight = "bold";
        title.style.fontFamily = "Arial";
        title.style.userSelect = "none";

        return title;
    }

    hide() {
        this.panel.animate([
            {transform: "translateX(" + this.hideWidth + "px)"}
        ], {
            duration: this.hideTime,
            fill: "forwards"
        });
    }

    show() {
        this.panel.animate([
            {transform: "translateX(0px)"}
        ], {
            duration: this.hideTime,
            fill: "forwards"
        });
    }
}