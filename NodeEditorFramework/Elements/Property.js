export default class Property {
    constructor(valueType, initialValue) {
        if (!valueType.validate(initialValue)) {
            throw "Illegal value for type " + valueType.id + " - " + initialValue;
        }

        this.valueType = valueType;
        this.value = initialValue;
        this.editorOpen = false;

        this.node = undefined;
    }

    setNode (node) {
        this.node = node;
    }
}