class Dictionary {
    constructor() {
        this._dictionary = [];

        this.add('.', (d, s) => {
            return s.pop()
        });
        this.add('.s', (d, s) => {
            s.print()
        });
        this.add('+', (d, s) => {
            s.push(s.pop() + s.pop())
        });
        this.add('-', (d, s) => {
            let a = s.pop(), b = s.pop();
            s.push(b - a);
        });
        this.add('*', (d, s) => {
            s.push(s.pop() * s.pop())
        });
        this.add('/', (d, s) => {
            let a = s.pop(), b = s.pop();
            s.push(Math.floor(b / a));
        });
    }

    // add a word and definition to the dictionary
    add(methodName, method) {
        this._dictionary.push([methodName, method]);
    }

    // search the dictionary for a word
    find(methodName) {
        console.log(methodName)
        let method = this._dictionary.find((method) => method[0] === methodName);

        if (method)
            return method[1];
        else
            return null;
    }
}

module.exports = Dictionary;