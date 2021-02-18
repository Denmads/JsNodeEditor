import Node from "../NodeEditorFramework/Elements/Node.js";
import NodeDatabase from "../NodeEditorFramework/NodeDatabase.js";
import NodeEditor from "../NodeEditorFramework/NodeEditor.js";
import AndNode from "./nodes/AndNode.js";
import OrNode from "./nodes/OrNode.js";

let nodeDatabase = new NodeDatabase();

nodeDatabase.addNode("Logic", new AndNode())
nodeDatabase.addNode("Logic", new OrNode())

let nodeEditor = new NodeEditor(nodeDatabase);
document.body.appendChild(nodeEditor.getDisplay());
nodeEditor.initialize();


window.nodeEditor = nodeEditor;