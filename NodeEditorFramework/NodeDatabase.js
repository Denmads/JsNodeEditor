export default class NodeDatabase {
    constructor() {
        this.nodes = {};
    }

    addNode(category, nodeObject) {
        if (!(category in this.nodes)) {
            this.nodes[category] = []
        }

        this.nodes[category].push(nodeObject);
    }

    getAllNodesInCategory(category) {
        return this.nodes[category];
    }

    getCategories() {
        return Object.keys(this.categories);
    }
}