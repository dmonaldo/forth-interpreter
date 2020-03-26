class Dictionary {
    constructor() {
        this._dictionary = [
            // ['.', function(stack) {return stack.pop()}]
        ];
        return this;
    }

    add(methodName, method) {
        // add a word and definition to the dictionary
        this._dictionary.push([methodName, method]);
    }

    find(methodName) {
        // search the dictionary for a word
        let method = this._dictionary.find((method) => method[0] === methodName);

        if (method)
            return method[1];
        else
            return null;
    }
}

module.exports = Dictionary;