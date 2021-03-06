const Step = require('./step');

class Dictionary {
    constructor() {
        this._dictionary = [];

        /* POPULATE DICTIONARY */
        // .
        this.add(new Step('.', (d, s, next) => {
            s.pop();
            next();
        }));

        // .s
        this.add(new Step('.s', (d, s, next) => {
            s.print();
            next();
        }));

        // +
        this.add(new Step('+', (d, s, next) => {
            s.push(s.pop() + s.pop());
            next();
        }));

        // -
        this.add(new Step('-', (d, s, next) => {
            let a = s.pop(), b = s.pop();
            s.push(b - a);
            next();
        }));

        // *
        this.add(new Step('*', (d, s, next) => {
            s.push(s.pop() * s.pop());
            next();
        }));

        // /
        this.add(new Step('/', (d, s, next) => {
            let a = s.pop(), b = s.pop();
            s.push(Math.floor(b / a));
            next();
        }));

        // dup
        this.add(new Step('dup', (d, s, next) => {
            let a = s.pop();
            s.push(a);
            s.push(a);
            next();
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