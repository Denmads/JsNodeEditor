import NodeDatabase from "../NodeEditorFramework/NodeDatabase.js";
import NodeEditor from "../NodeEditorFramework/NodeEditor.js";
import AndNode from "./nodes/AndNode.js";
import OrNode from "./nodes/OrNode.js";
import NotNode from "./nodes/NotNode.js";
import XorNode from "./nodes/XorNode.js";
import AddNode from "./nodes/AddNode.js";

let nodeDatabase = new NodeDatabase();

nodeDatabase.addNode("Logic", AndNode);
nodeDatabase.addNode("Logic", OrNode);
nodeDatabase.addNode("Logic", NotNode);
nodeDatabase.addNode("Logic", XorNode);
nodeDatabase.addNode("Math", AddNode);

let nodeEditor = new NodeEditor(nodeDatabase);
document.body.appendChild(nodeEditor.getDisplay());
nodeEditor.initialize();


window.nodeEditor = nodeEditor;