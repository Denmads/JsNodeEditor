import generateObjectFolder from "./ObjectFolderGenerator.js";

export default class ObjectPickerPanel {
    constructor(parent, style, nodeDatabase) {
        this.panelWidth = "20%";
        this.hidePercentage = 0.9;
        this.hideTime = 300;

        this.hidden = false;
        
        this.nodeDatabase = nodeDatabase;

        this.panel = document.createElement("div");
        this.panel.style.height = "100%";
        this.panel.style.width = this.panelWidth;
        this.panel.style.backgroundColor = style.panelBackgroundColor;
        this.panel.style.position = "relative";
        this.panel.style.padding = "10px";
        this.panel.style.display = "block ruby";
        this.contentPane = document.createElement("div");
        this.contentPane.style.height = "97%";
        this.contentPane.style.width = "100%";
        this.contentPane.style.overflowY = "auto";
        this.panel.appendChild(this.contentPane);
        parent.appendChild(this.panel);

        this.toggle = this.createToggleButton(style);
        this.panel.insertBefore(this.toggle, this.panel.children[0]);

        this.hideWidth = Math.floor(this.panel.clientWidth * this.hidePercentage);

        this.nodeDatabase.getCategories().forEach((category) => {
            generateObjectFolder(this.contentPane, category, this.nodeDatabase.getAllNodesInCategory(category));
        });
    }

    createToggleButton (style) {
        let toggle = document.createElement("div");
        toggle.style.cursor = "pointer";
        toggle.innerText = "Node Picker";
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
        toggle.style.marginRight = "-10px";
        toggle.style.marginTop = "-10px";

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