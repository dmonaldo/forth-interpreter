const Step = require('./step');

class Dictionary {
    constructor() {
        this._dictionary = [];

        // Populate dictionary

        // .
        this.add(new Step('.', (d, s) => {
            return s.pop();
        }));

        // .s
        this.add(new Step('.s', (d, s) => {
            s.print();
        }));

        // +
        this.add(new Step('+', (d, s) => {
            s.push(s.pop() + s.pop());
        }));

        // -
        this.add(new Step('-', (d, s) => {
            let a = s.pop(), b = s.pop();
            s.push(b - a);
        }));

        // *
        this.add(new Step('*', (d, s) => {
            s.push(s.pop() * s.pop());
        }));

        // /
        this.add(new Step('/', (d, s) => {
            let a = s.pop(), b = s.pop();
            s.push(Math.floor(b / a));
        }));
    }

    // add a word and definition to the dictionary
    add(definition) {
        // TODO: check if definition already exists, if so overwrite it
        // console.log("ADDING ", definition)
        this._dictionary.push([definition._name, definition]);
    }

    // search the dictionary for a word
    find(methodName) {
        let method = this._dictionary.find((method) => method[0] === methodName);
// console.log("METHOD", methodName, method)
        if (method)
            return method[1];
        else
            return null;
    }
}

module.exports = Dictionary;