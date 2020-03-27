const Stack = require('./stack');
const Dictionary = require('./dictionary');

class Forth {
    constructor(debug) {
        this.stack = new Stack();
        this.dictionary = new Dictionary();
        this.definition;
        this.debug = debug;
    }

    processInput(input) {
        if (input.length == 0)
            return;

        // split and filter out extra spaces
        input = input.split(' ').filter((w) => w !== '');

        for (let i = 0; i < input.length; i++) {
            // push numbers to stack
            if (!isNaN(input[i]) && !this.definition) {
                this.stack.push(parseInt(input[i]));
            } else {
                // begin new definition
                if (input[i][0] === ':') {
                    if (input[i].length > 1) {
                        let definitionName = input[i].substring(1);
                        this.startDefinition(definitionName);
                    } else {
                        // gets definition name if there is a space after ':'
                        this.startDefinition(input[++i]);
                    }
                }
                // compile and end new definition
                else if (input[i] === ';') {
                    this.endDefinition();
                }
                // add steps to a definition in progress
                else if (this.definition) {
                    // end definition if word ends in ';'
                    if (input[i][input[i].length-1] === ';') {
                        let word = input[i].substring(0, input[i].length-1);
                        this.definition.steps.push(word);
                        this.endDefinition();
                    } else {
                        this.definition.steps.push(input[i]);
                    }
                }
                // perform operation
                else {
                    this.performOperation(input[i]);
                }
            }
        }

        if (this.debug) {
            console.log('STACK: ', this.stack._stack, " <- TOP");
            console.log('DICTIONARY: ', JSON.stringify(this.dictionary._dictionary))
        }
    }

    performOperation(word) {
        let method = this.dictionary.find(word);

        if (method) {
            if (Array.isArray(method)) {
                for (let i in method)
                    method[i](this.stack);
            } else {
                method(this.stack);
            }
        } else {
            console.log('Operation does not exist');
        }
    }

    startDefinition(definitionName) {
        this.definition = {
            name: definitionName,
            steps: []
        }
    }

    compileDefinition() {
        let functionWrapper = (step) => (s) => s.push(step);

        let compiledDefinition = [];
        for (let j in this.definition.steps) {
            if (!isNaN(this.definition.steps[j])) {
                compiledDefinition.push(functionWrapper(parseInt(this.definition.steps[j])));
            } else {
                let method = this.dictionary.find(this.definition.steps[j]);
                if (method) {
                    compiledDefinition.push(method);
                } else {
                    console.log('Operation does not exist');
                }
            }
        }
        return compiledDefinition;
    }

    endDefinition() {
        console.log(this.definition)
        this.dictionary.add(this.definition.name, this.compileDefinition());
        this.definition = null;
    }
}

module.exports = Forth;