import NodeEditor from "../NodeEditorFramework/NodeEditor.js";

let nodeEditor = new NodeEditor();
document.body.appendChild(nodeEditor.getDisplay());
nodeEditor.initialize();
window.nodeEditor = nodeEditor;