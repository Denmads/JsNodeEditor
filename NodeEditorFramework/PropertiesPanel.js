import generatePropertyUi, { generateErrorUi } from "./PropertyUiGenerator.js";

export default class PropertiesPanel {
    constructor(parent, style) {
        this.panelWidth = "20%";
        this.hidePercentage = 0.9;
        this.hideTime = 300;

        this.panel = document.createElement("div");
        this.panel.style.height = "100%";
        this.panel.style.width = this.panelWidth;
        this.panel.style.backgroundColor = style.panelBackgroundColor;
        this.panel.style.padding = "10px";
        this.panel.style.position = "relative";
        this.contentPane = document.createElement("div");
        this.contentPane.style.height = "97%";
        this.contentPane.style.width = "100%";
        this.contentPane.style.overflowY = "auto";
        this.panel.appendChild(this.contentPane);
        parent.appendChild(this.panel);

        this.title = this.createTitle(style);
        this.panel.insertBefore(this.title, this.panel.children[0]);

        this.hideWidth = Math.floor(this.panel.clientWidth * this.hidePercentage);
        this.hide();
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
        title.style.marginLeft = "-10px";
        title.style.marginTop = "-10px";

        this.allowInteraction = false;
        this.hidden = true;

        title.addEventListener("click", (() => {
            if (this.allowInteraction) {
                if (this.hidden) {
                    this.show();
                    this.hidden = false;
                }
                else {
                    this.hide(false);
                    this.hidden = true;
                }
            }
        }).bind(this))

        return title;
    }

    setNode(node) {
        
        if (node == undefined) {
            this.currentNode.unregisterOnErrorStateChangeCallback("propsPanel");
        }

        this.currentNode = node;

        if (node == undefined) {
            this.hide(true);
            this.hidden = true;
            this.allowInteraction = false;
            this.title.style.cursor = "default";
        }
        else {

            node.registerOnErrorStateChangeCallback("propsPanel", function () {
                this.contentPane.innerHTML = "";

                if (node.error != undefined) {
                    generateErrorUi(this.contentPane, node.error);
                }
    
                for (let prop in this.currentNode.properties) {
                    generatePropertyUi(this.contentPane, prop, this.currentNode.properties[prop]);
                }

            }.bind(this))

            if (node.error != undefined) {
                generateErrorUi(this.contentPane, node.error);
            }

            for (let prop in this.currentNode.properties) {
                generatePropertyUi(this.contentPane, prop, this.currentNode.properties[prop]);
            }
            
            if (Object.keys(this.currentNode.properties).length > 0) {
                this.show();
                this.hidden = false;
            }

            this.allowInteraction = true;
            this.title.style.cursor = "pointer";
        }
    }

    hide(erase) {
        this.panel.animate([
            {transform: "translateX(" + this.hideWidth + "px)"}
        ], {
            duration: this.hideTime,
            fill: "forwards"
        });

        if (erase) {
            let eraseContent = function () {
                this.contentPane.innerHTML = "";
            }
            setTimeout(eraseContent.bind(this), this.hideTime)
        }
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