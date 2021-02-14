export default class ObjectPickerPanel {
    constructor(parent, style) {
        this.panelWidth = "20%";
        this.hidePercentage = 0.9;
        this.hideTime = 300;

        this.hidden = false;
        


        this.panel = document.createElement("div");
        this.panel.style.height = "100%";
        this.panel.style.width = this.panelWidth;
        this.panel.style.backgroundColor = style.panelBackgroundColor;
        this.panel.style.position = "relative";
        parent.appendChild(this.panel);

        this.toggle = this.createToggleButton(style);
        this.panel.appendChild(this.toggle);

        this.hideWidth = Math.floor(this.panel.clientWidth * this.hidePercentage);
    }

    createToggleButton (style) {
        let toggle = document.createElement("div");
        toggle.style.cursor = "pointer";
        toggle.innerText = "Object Picker";
        toggle.style.backgroundColor = style.panelSecondaryBackgroundColor;
        toggle.style.padding = "10px";
        toggle.style.borderRadius = "20px";
        toggle.style.float = "right";
        toggle.style.transform = "rotate(-90deg)";
        toggle.style.transformOrigin = "right";
        toggle.style.fontSize = "14px";
        toggle.style.fontWeight = "bold";
        toggle.style.fontFamily = "Arial";
        toggle.style.userSelect = "none";

        toggle.addEventListener("click", (() => {
            if (this.hidden) {
                this.show();
                this.hidden = false;
            }
            else {
                this.hide();
                this.hidden = true;
            }
        }).bind(this))

        return toggle;
    }

    hide() {
        this.panel.animate([
            {transform: "translateX(-" + this.hideWidth + "px)"}
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