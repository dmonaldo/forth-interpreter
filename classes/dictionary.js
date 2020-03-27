class Dictionary {
    constructor() {
        this._dictionary = [
            ['.', (s) => {return s.pop()}],
            ['.s', (s) => {s.print()}],
            ['+', (s) => {s.push(s.pop() + s.pop())}],
            ['-', (s) => {
                let a = s.pop(), b = s.pop();
                s.push(b - a);
            }]
        ];
    }

    // add a word and definition to the dictionary
    add(methodName, method) {
        this._dictionary.push([methodName, method]);
    }

    // search the dictionary for a word
    find(methodName) {
        let method = this._dictionary.find((method) => method[0] === methodName);

        if (method)
            return method[1];
        else
            return null;
    }
}

module.exports = Dictionary;