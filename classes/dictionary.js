const Step = require('./step');

class Dictionary {
    constructor() {
        this._dictionary = [];

        /* POPULATE DICTIONARY */
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

        // dup
        this.add(new Step('dup', (d, s) => {
            let a = s.pop();
            s.push(a);
            s.push(a);
        }));

        // immediate
        this.add(new Step('immediate', (d, s) => {
            // add offset to instruction pointer

        }));

        // unconditional branch
        this.add(new Step('branch', (d, s) => {
            // add offset to instruction pointer

        }));

        // conditional branch
        this.add(new Step('0branch', (d, s) => {
            // 
        }));
    }

    // add a definition to the dictionary
    add(definition) {
        let existingDefinition = this.find(definition._name);

        if (existingDefinition === null)
            this._dictionary.push([definition._name, definition]);
        else
            this.update(definition);
    }

    // update an existing definition in the dictionary
    update(definition) {
        let definitionName = definition._name;
        let existingDefinitionIndex = this._dictionary.findIndex((definition) => definition[0] === definitionName);

        if (existingDefinitionIndex >= 0)
            this._dictionary[existingDefinitionIndex] = [definition._name, definition];
    }

    // search the dictionary for a definition
    find(definitionName) {
        let definition = this._dictionary.find((definition) => definition[0] === definitionName);

        if (definition !== undefined)
            return definition[1];
        else
            return null;
    }
}

module.exports = Dictionary;