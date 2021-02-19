export default function generateObjectFolder(parentDOM, name, nodes) {
    let container = document.createElement("div");
    container.style.userSelect = "none";
    container.style.border = "1px solid black";
    container.style.width = "90%";
    let body = generateBody(nodes);
    generateHeader(container, name, body);

    parentDOM.appendChild(container);
}

function generateHeader(container, name, body) {
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
    title.innerText = name;
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

function generateBody(nodes) {
    let body = document.createElement("div");
    body.style.minHeight = "20px";
    body.style.backgroundColor = "#515151";
    body.style.display = "none";
    body.style.flexDirection = "column";

    let rowCount = Math.ceil(nodes.length / 3);

    let nodeIndex = 0;
    for (let i = 0; i < rowCount; i++) {
        let row = document.createElement("div");
        row.style.paddingTop = "5px";
        row.style.paddingBottom = "5px";
        row.style.width = "100%";
        row.style.display = "flex";
        row.style.justifyContent = "space-around";
        body.appendChild(row);

        for (let j = 0; j < 3 && nodeIndex < nodes.length; j++) {
            let content = document.createElement("div");
            content.style.width = "50px";
            content.style.height = "50px";
            content.style.border = "2px solid black";
            content.style.borderRadius = "10px";
            content.style.backgroundColor = "#393939";
            content.style.cursor = "pointer";
            content.style.textAlign = "center";
            content.style.fontFamily = "Arial";

            content.addEventListener("mouseenter", (e) => {
                content.style.backgroundColor = "#464646";
            });

            content.addEventListener("mouseleave", (e) => {
                content.style.backgroundColor = "#393939";
            });

            content.innerText = nodes[nodeIndex].name;
            row.appendChild(content);
            
            nodeIndex++;
        }
    }

    

    return body;
}