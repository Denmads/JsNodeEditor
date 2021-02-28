export function generateErrorUi(parentDOM, error) {
    let container = document.createElement("div");
    container.style.userSelect = "none";
    container.style.border = "1px solid black";
    container.style.width = "90%";
    container.style.float = "right";

    let body = generateErrorBody(error);
    generateErrorHeader(container, body);

    parentDOM.appendChild(container);
}

function generateErrorHeader(container, body) {
    let header = document.createElement("div");
    header.style.height = "20px";
    header.style.backgroundColor = "#aa4444";
    header.style.display = "flex";
    header.style.justifyContent = "space-between"
    header.style.fontWeight = "bold";
    header.style.fontFamily = "Arial"
    header.style.textAlign = "center";
    header.style.cursor = "pointer";

    let title = document.createElement("span");
    title.style.marginLeft = "1rem";
    title.innerText = "Error";
    header.appendChild(title);

    let arrow = document.createElement("div");
    arrow.style.marginRight = "1rem";
    arrow.innerText = ">";
    header.appendChild(arrow);

    header.addEventListener("mousedown", (e) => {
        if (body.style.display == "flex") {
            body.style.display = "none";
            arrow.innerText = ">";
        }
        else {
            body.style.display = "flex";
            arrow.innerText = "v";
        }

    });

    container.appendChild(header);
    container.appendChild(body);
}

function generateErrorBody(error) {
    let body = document.createElement("div");
    body.style.minHeight = "20px";
    body.style.backgroundColor = "#882222";
    body.style.fontFamily = "Arial";
    body.style.display = "none";
    body.style.padding = "3px";

    body.innerText = error;

    return body;
}

export default function generatePropertyUi(parentDOM, name, property) {
    let container = document.createElement("div");
    container.style.userSelect = "none";
    container.style.border = "1px solid black";
    container.style.width = "90%";
    container.style.float = "right";
    let body = generateBody(property);
    generateHeader(container, name, body, property);

    parentDOM.appendChild(container);
}

function generateHeader(container, name, body, property) {
    let header = document.createElement("div");
    header.style.height = "20px";
    header.style.backgroundColor = "#666666";
    header.style.display = "flex";
    header.style.justifyContent = "space-between"
    header.style.fontWeight = "bold";
    header.style.fontFamily = "Arial"
    header.style.textAlign = "center";
    header.style.cursor = "pointer";

    let title = document.createElement("span");
    title.style.marginLeft = "1rem";
    title.innerText = name + " (" + property.valueType.id + ")";
    header.appendChild(title);

    let arrow = document.createElement("div");
    arrow.style.marginRight = "1rem";
    arrow.innerText = ">";
    header.appendChild(arrow);

    header.addEventListener("mousedown", (e) => {
        if (body.style.display == "flex") {
            body.style.display = "none";
            arrow.innerText = ">";
            property.editorOpen = false;
        }
        else {
            body.style.display = "flex";
            arrow.innerText = "v";
            property.editorOpen = true;
        }

    });

    container.appendChild(header);
    container.appendChild(body);
}

function generateBody(property) {
    let body = document.createElement("div");
    body.style.minHeight = "20px";
    body.style.backgroundColor = "#515151";
    if (property.editorOpen) {
        body.style.display = "flex";
    }
    else {
        body.style.display = "none";
    }

    body.append(property.valueType.editor(property))

    return body;
}