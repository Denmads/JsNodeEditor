export default class ValueType {
    static STRING = {
        id: "string", 
        color: "#32a852",
        validate: function(value) {
            return (typeof value === "string");
        },
        editor: function(property) {
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.style.width = "90%";
            input.style.margin = "5px auto";
            input.style.borderRadius = "10px";
            input.style.backgroundColor = "#333333";
            input.style.paddingLeft = "10px";
            input.style.outline = "none";
            input.style.border = "1px solid #222222";

            input.value = property.value;

            input.addEventListener("input", function(e) {
                if (this.validate(input.value)) {
                    input.style.border = "1px solid #222222";
                    property.value = input.value;
                }
                else {
                    input.style.border = "2px solid #aa2222";
                }
            }.bind(this))

            return input;
        }
    };
    static NUMBER = {
        id: "number", 
        color: "#3290a8",
        validate: function(value) {
            return !Number.isNaN(value);
        },
        editor: function(property) {
            let input = document.createElement("input");
            input.setAttribute("type", "text");
            input.style.width = "90%";
            input.style.margin = "5px auto";
            input.style.borderRadius = "10px";
            input.style.backgroundColor = "#333333";
            input.style.paddingLeft = "10px";
            input.style.outline = "none";
            input.style.border = "1px solid #222222";

            input.value = property.value + "";

            input.addEventListener("input", function(e) {
                let num = Number(input.value);
                if (this.validate(num)) {
                    input.style.border = "1px solid #222222";
                    property.value = num;
                }
                else {
                    input.style.border = "2px solid #aa2222";
                }
            }.bind(this))

            return input;
        }
    };
    static BOOLEAN = {
        id: "bool", 
        color: "#a85b32",
        validate: function(value) {
            return (typeof value === "boolean");
        },
        editor: function(property) {
            let select = document.createElement("select");
            select.style.width = "90%";
            select.style.margin = "5px auto";
            select.style.borderRadius = "10px";
            select.style.backgroundColor = "#333333";
            select.style.paddingLeft = "10px";
            select.style.outline = "none";
            select.style.border = "1px solid #222222";
            select.style.webkitAppearance = "none";

            let trueOption = document.createElement("option");
            trueOption.value = true;
            trueOption.text = "True";
            select.appendChild(trueOption);
            

            let falseOption = document.createElement("option");
            falseOption.value = false;
            falseOption.text = "False";
            select.appendChild(falseOption);
            
            if (property.value) {
                trueOption.setAttribute("selected", "selected");
            }
            else {
                falseOption.setAttribute("selected", "selected");
            }

            select.addEventListener("change", function(e) {
                let val = select.value === "true" ? true : false;
                if (this.validate(val)) {
                    select.style.border = "1px solid #222222";
                    property.value = val;
                }
                else {
                    select.style.border = "2px solid #aa2222";
                }
            }.bind(this))

            return select;
        }
    };
}