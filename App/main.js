import NodeDatabase from "../NodeEditorFramework/NodeDatabase.js";
import NodeEditor from "../NodeEditorFramework/NodeEditor.js";
import AndNode from "./nodes/AndNode.js";
import OrNode from "./nodes/OrNode.js";
import NotNode from "./nodes/NotNode.js";
import XorNode from "./nodes/XorNode.js";
import AddNode from "./nodes/AddNode.js";

let nodeDatabase = new NodeDatabase();

nodeDatabase.addNode("Logic", new AndNode())
nodeDatabase.addNode("Logic", new OrNode())
nodeDatabase.addNode("Logic", new NotNode())
nodeDatabase.addNode("Logic", new XorNode())
nodeDatabase.addNode("Math", new AddNode())

let nodeEditor = new NodeEditor(nodeDatabase);
document.body.appendChild(nodeEditor.getDisplay());
nodeEditor.initialize();


window.nodeEditor = nodeEditor;